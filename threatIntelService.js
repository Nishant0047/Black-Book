const axios = require("axios");
const path = require("path");
const fs = require("fs");

const { writeJSON, appendLog } = require("./caseManager");

require("dotenv").config();

/**
 * Read extracted IOCs
 */
function readIOCs(casePath) {
    const filePath = path.join(casePath, "extracted_iocs.json");
    return JSON.parse(fs.readFileSync(filePath));
}

/**
 * Query AlienVault OTX
 */
async function queryOTX(type, value) {
    const url = `https://otx.alienvault.com/api/v1/indicators/${type}/${value}/general`;

    const response = await axios.get(url, {
        headers: {
            "X-OTX-API-KEY": process.env.OTX_API_KEY
        }
    });

    return response.data;
}

/**
 * Query VirusTotal
 */
async function queryVirusTotal(type, value) {
    const base = "https://www.virustotal.com/api/v3";
    const endpoint =
        type === "ip"
            ? `/ip_addresses/${value}`
            : `/domains/${value}`;

    const response = await axios.get(base + endpoint, {
        headers: {
            "x-apikey": process.env.VT_API_KEY
        }
    });

    return response.data;
}

/**
 * Query AbuseIPDB
 */
async function queryAbuseIPDB(ip) {
    const response = await axios.get(
        `https://api.abuseipdb.com/api/v2/check`,
        {
            params: {
                ipAddress: ip,
                maxAgeInDays: 90
            },
            headers: {
                Key: process.env.ABUSEIPDB_API_KEY,
                Accept: "application/json"
            }
        }
    );

    return response.data;
}

/**
 * Enrich IOCs
 */
async function enrichThreatIntel(casePath) {
    try {
        appendLog(casePath, "Starting Threat Intelligence enrichment...");

        const iocs = readIOCs(casePath);

        const otxResults = {};
        const vtResults = {};
        const abuseResults = {};

        // Process IPs
        const allIPs = [...(iocs.sourceIPs || []), ...(iocs.destinationIPs || [])];

        for (const ip of allIPs) {
            try {
                appendLog(casePath, `Checking IP: ${ip}`);

                otxResults[ip] = await queryOTX("IPv4", ip);
                vtResults[ip] = await queryVirusTotal("ip", ip);
                abuseResults[ip] = await queryAbuseIPDB(ip);

            } catch (err) {
                appendLog(casePath, `Error checking IP ${ip}: ${err.message}`);
            }
        }

        // Process Domains
        const domains = [...(iocs.domains || []), ...(iocs.httpHosts || [])];

        for (const domain of domains) {
            try {
                appendLog(casePath, `Checking Domain: ${domain}`);

                otxResults[domain] = await queryOTX("domain", domain);
                vtResults[domain] = await queryVirusTotal("domain", domain);

            } catch (err) {
                appendLog(casePath, `Error checking Domain ${domain}: ${err.message}`);
            }
        }

        writeJSON(casePath, "otx_results.json", otxResults);
        writeJSON(casePath, "virustotal_results.json", vtResults);
        writeJSON(casePath, "abuseipdb_results.json", abuseResults);

        const merged = {
            otx: otxResults,
            virustotal: vtResults,
            abuseipdb: abuseResults
        };

        writeJSON(casePath, "enriched_results.json", merged);

        appendLog(casePath, "Threat Intelligence enrichment completed.");

        return merged;

    } catch (error) {
        appendLog(casePath, `Threat Intel Error: ${error.message}`);
        throw new Error("Threat Intelligence processing failed.");
    }
}

module.exports = {
    enrichThreatIntel
};
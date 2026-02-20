const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const { writeJSON, appendLog } = require("./caseManager");

/**
 * Execute tshark command
 */
function runTshark(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

/**
 * Remove empty values and duplicates
 */
function cleanAndDeduplicate(array) {
    return [...new Set(array.filter(Boolean))];
}

/**
 * Process PCAP and extract IOCs
 */
async function processPCAP(casePath, pcapFilePath) {
    try {
        appendLog(casePath, "Starting PCAP analysis...");

        const tsharkPath = `"C:\\Program Files\\Wireshark\\tshark.exe"`;

        const ipCommand = `${tsharkPath} -r "${pcapFilePath}" -T fields -e ip.src -e ip.dst`;
        const dnsCommand = `${tsharkPath} -r "${pcapFilePath}" -T fields -e dns.qry.name`;
        const httpCommand = `${tsharkPath} -r "${pcapFilePath}" -T fields -e http.host`;

        const [ipOutput, dnsOutput, httpOutput] = await Promise.all([
            runTshark(ipCommand),
            runTshark(dnsCommand),
            runTshark(httpCommand)
        ]);

        appendLog(casePath, "Raw data extracted from PCAP.");

        // Process IPs
        const ipLines = ipOutput.split("\n");
        let sourceIPs = [];
        let destinationIPs = [];

        ipLines.forEach(line => {
            const parts = line.split("\t");
            if (parts[0]) sourceIPs.push(parts[0]);
            if (parts[1]) destinationIPs.push(parts[1]);
        });

        sourceIPs = cleanAndDeduplicate(sourceIPs);
        destinationIPs = cleanAndDeduplicate(destinationIPs);

        // Process Domains
        const domains = cleanAndDeduplicate(dnsOutput.split("\n"));
        const httpHosts = cleanAndDeduplicate(httpOutput.split("\n"));

        const extractedIOCs = {
            sourceIPs,
            destinationIPs,
            domains,
            httpHosts
        };

        writeJSON(casePath, "extracted_iocs.json", extractedIOCs);

        appendLog(casePath, "IOC extraction completed successfully.");

        return extractedIOCs;

    } catch (error) {
        appendLog(casePath, `PCAP processing error: ${error}`);
        throw new Error("Failed to process PCAP.");
    }
}

module.exports = {
    processPCAP
};
/**
 * Generate basic analytics from threat results
 */
const generateAnalytics = (threatResults) => {
  try {
    let totalIndicators = 0;
    let suspiciousCount = 0;

    // Count OTX results
    if (threatResults.otx) {
      totalIndicators += Object.keys(threatResults.otx).length;
    }

    // Count VirusTotal results
    if (threatResults.virustotal) {
      totalIndicators += Object.keys(threatResults.virustotal).length;
    }

    // Count AbuseIPDB results
    if (threatResults.abuseipdb) {
      totalIndicators += Object.keys(threatResults.abuseipdb).length;
    }

    // Simple Risk Score Logic
    suspiciousCount = totalIndicators; // basic logic for now

    let riskLevel = "Low";

    if (suspiciousCount > 10) {
      riskLevel = "High";
    } else if (suspiciousCount > 5) {
      riskLevel = "Medium";
    }

    return {
      totalIndicators,
      suspiciousCount,
      riskLevel,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    throw new Error("Analytics generation failed: " + error.message);
  }
};

module.exports = {
  generateAnalytics
};
const fs = require("fs");
const path = require("path");

const BASE_STORAGE_PATH = path.join(__dirname, "../../storage/cases");
const COUNTER_FILE = path.join(BASE_STORAGE_PATH, "caseCounter.json");

/**
 * Ensure base storage folder exists
 */
function initializeStorage() {
    if (!fs.existsSync(BASE_STORAGE_PATH)) {
        fs.mkdirSync(BASE_STORAGE_PATH, { recursive: true });
    }

    if (!fs.existsSync(COUNTER_FILE)) {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify({ lastCaseNumber: 0 }, null, 2));
    }
}

/**
 * Get next case number
 */
function getNextCaseNumber() {
    const counterData = JSON.parse(fs.readFileSync(COUNTER_FILE));
    const nextNumber = counterData.lastCaseNumber + 1;

    counterData.lastCaseNumber = nextNumber;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counterData, null, 2));

    return String(nextNumber).padStart(3, "0");
}

/**
 * Create new case folder
 */
function createNewCase() {
    initializeStorage();

    const caseNumber = getNextCaseNumber();
    const caseName = `case_${caseNumber}`;
    const casePath = path.join(BASE_STORAGE_PATH, caseName);

    fs.mkdirSync(casePath);

    return {
        caseName,
        casePath
    };
}

/**
 * Save uploaded PCAP file into case folder
 */
function saveUploadedFile(casePath, uploadedFile) {
    const extension = path.extname(uploadedFile.originalname);
    const newFilePath = path.join(casePath, `original${extension}`);

    fs.renameSync(uploadedFile.path, newFilePath);

    return newFilePath;
}

/**
 * Create empty result files for tracking
 */
function initializeCaseFiles(casePath) {
    const files = [
        "extracted_iocs.json",
        "otx_results.json",
        "virustotal_results.json",
        "abuseipdb_results.json",
        "analytics_report.json",
        "logs.txt"
    ];

    files.forEach(file => {
        const filePath = path.join(casePath, file);
        fs.writeFileSync(filePath, file.endsWith(".json") ? "{}" : "");
    });
}

/**
 * Write JSON data to specific file inside case
 */
function writeJSON(casePath, fileName, data) {
    const filePath = path.join(casePath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Append logs
 */
function appendLog(casePath, message) {
    const logPath = path.join(casePath, "logs.txt");
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

module.exports = {
    createNewCase,
    saveUploadedFile,
    initializeCaseFiles,
    writeJSON,
    appendLog
};
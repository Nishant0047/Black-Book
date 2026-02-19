Advanced Threat Intelligence System Architecture
                         
                         ┌─────────────────────────┐
                         │        Client Layer      │
                         │  (Postman / Frontend UI) │
                         └─────────────┬───────────┘
                                       │
                                       ▼
                         ┌─────────────────────────┐
                         │      API Gateway        │
                         │     Express Server      │
                         │        (app.js)         │
                         └─────────────┬───────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
        ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
        │   Middleware    │  │   Controllers   │  │      Routes     │
        │ uploadMiddleware│  │ caseController  │  │   caseRoutes    │
        └─────────────────┘  └─────────────────┘  └─────────────────┘
                                       │
                                       ▼
                         ┌─────────────────────────┐
                         │     Service Layer       │
                         └─────────────┬───────────┘
                                       │
        ┌───────────────┬──────────────┼───────────────┬──────────────────────┐
        ▼               ▼              ▼               ▼                      ▼
  ┌─────────────┐ ┌─────────────┐  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ CaseManager │ │PCAPProcessor│  │ ThreatIntel  │ │ Analytics    │ │ ReportGen    │
  │             │ │  (TShark)   │  │   Service    │ │  Engine      │ │              │
  └─────────────┘ └─────────────┘  └──────────────┘ └──────────────┘ └──────────────┘
                                       │
                                       ▼
                             ┌────────────────────┐
                             │ External APIs      │
                             │  - AlienVault OTX  │
                             │  - VirusTotal      │
                             │  - AbuseIPDB       │
                             └────────────────────┘
                                       │
                                       ▼
                           ┌─────────────────────────┐
                           │  Email Service          │
                           │  (Nodemailer + Gmail)   │
                           └─────────────┬───────────┘
                                         │
                                         ▼
                           ┌─────────────────────────┐
                           │   Storage Layer         │
                           │ storage/cases/case_xxx  │
                           │                         │
                           │ - original.pcap         │
                           │ - extracted_iocs.json   │
                           │ - enriched_results.json │
                           │ - analytics_report.json │
                           │ - final_report.txt      │
                           │ - logs.txt              │
                           └─────────────────────────┘

Structure of backend of Advance Threat Intelligence System

server/
│
├── src/
│   ├── app.js
│   │
│   ├── controllers/
│   │   └── caseController.js
│   │
│   ├── routes/
│   │   └── caseRoutes.js
│   │
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   │
│   ├── services/
│   │   ├── caseManager.js
│   │   ├── pcapProcessor.js
│   │   ├── threatIntelService.js
│   │   ├── analyticsEngine.js
│   │   ├── reportGenerator.js
│   │   └── emailService.js
│   │
│   └── utils/
│
├── storage/
│   └── cases/
│       └── case_xxx/
│           ├── original.pcap
│           ├── extracted_iocs.json
│           ├── enriched_results.json
│           ├── analytics_report.json
│           ├── final_report.txt
│           └── logs.txt
│
├── .env
├── package.json
└── README.md


Step 1 – Upload PCAP
User uploads .pcap or .pcapng file.

Step 2 – IOC Extraction
Using Tshark:

Source IPs
Destination IPs
DNS Queries
HTTP Hosts

Step 3 – Threat Intelligence Enrichment
Each IOC is checked against:

AlienVault OTX
VirusTotal
AbuseIPDB

Step 4 – Analytics Engine
System calculates:

Total indicators
Suspicious count
Risk level (Low / Medium / High)

Step 5 – Report Generation
Creates structured .txt forensic report.

Step 6 – Email Delivery
Report is sent to provided email address.


⚙️ Tech Stack

Node.js
Express.js
Multer (file upload handling)
Tshark (Wireshark CLI) – PCAP parsing
Axios – External API calls
Nodemailer – Email delivery
Dotenv – Environment configuration

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
        ┌───────────────┬──────────────┼───────────────┬──────────────┬──────────────┐
        ▼               ▼              ▼               ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ CaseManager │ │ PCAPProcessor│ │ ThreatIntel  │ │ Analytics    │ │ ReportGen    │
│             │ │  (TShark)    │ │   Service    │ │  Engine      │ │              │
└─────────────┘ └─────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
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


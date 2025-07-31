import json
import os

def load_threat_data():
    threat_data = {}
    for filename in os.listdir("fetched_data"):
        if filename.endswith("_pulses.json"):
            ip = filename.replace("_pulses.json", "")
            with open(os.path.join("fetched_data", filename), "r") as f:
                data = json.load(f)
                threat_data[ip] = data
    return threat_data

def enrich_log_entry(log_entry, threat_data):
    matched_ip = None
    for ip_field in ["src_ip", "dst_ip"]:
        ip = log_entry.get(ip_field)
        if ip in threat_data:
            matched_ip = ip
            break

    if matched_ip:
        pulses = threat_data[matched_ip]["general"]["pulse_info"]["pulses"]
        log_entry["threat_detected"] = True
        log_entry["threat_ip"] = matched_ip
        log_entry["threat_context"] = [{
            "pulse": p["name"],
            "author": p["author_name"],
            "tags": p.get("tags", []),
            "created": p["created"]
        } for p in pulses]
    else:
        log_entry["threat_detected"] = False

    return log_entry

import os
import json
from OTXv2 import OTXv2, IndicatorTypes

API_KEY = 'ec0701add3ea6c802ccc5ca4865ef07b72d2def4635c9555e7123b4e429d26a5'

otx = OTXv2(API_KEY)

output_dir = "fetched_data"
os.makedirs(output_dir, exist_ok=True)

def extract_unique_ips(log_file):
    unique_ips = set()
    with open(log_file, "r") as f:
        logs = json.load(f)
        for entry in logs:
            for key in ["src_ip", "dst_ip"]:
                ip = entry.get(key)
                if ip:
                    unique_ips.add(ip)
    return list(unique_ips)

def fetch_pulse_data_for_ip(ip):
    try:
        print(f"🔍 Fetching data for IP: {ip}")
        data = otx.get_indicator_details_full(IndicatorTypes.IPv4, ip)
        output_path = os.path.join(output_dir, f"{ip}_pulses.json")
        with open(output_path, "w") as f:
            json.dump(data, f, indent=4)
        print(f"✅ Saved to {output_path}")
    except Exception as e:
        print(f"⚠️ Error fetching data for {ip}: {e}")

if __name__ == "__main__":
    log_file = "systlog.json"
    print("📦 Extracting IPs from system log...")
    ip_list = extract_unique_ips(log_file)
    print(f"✅ Found {len(ip_list)} unique IP(s)")

    for ip in ip_list:
        fetch_pulse_data_for_ip(ip)


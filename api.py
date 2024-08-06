from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import random

PORT = 8000

def generate_data():
    clients = ["Barney", "Bart", "Homer", "Lisa"]
    stocks = ["ASML.N", "WMT.N", "GOOGL.N", "BAC.N", "JNJ.N", "TM.N", "NVDA.N", "KO.N", "ADBE.N", "V.N", "MA.N", "NFLX.N", "TSM.N", "XOM.N", "CMCSA.N", "AAPL.N", "AMZN.N", "BABA.N", "DIS.N"]
    data = []
    for client in clients:
        for stock in stocks:
            chg_minus = round(random.uniform(-10, 0), 2)
            chg = round(random.uniform(-5, 5), 2)
            chg_plus = round(random.uniform(0, 10), 2)
            data.append({
                "client": client,
                "name": stock,
                "chg-": chg_minus,
                "chg": chg,
                "chg+": chg_plus
            })
    return data

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow CORS
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        data = {"data": generate_data()}
        self.wfile.write(json.dumps(data).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler):
    server_address = ('', PORT)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {PORT}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()

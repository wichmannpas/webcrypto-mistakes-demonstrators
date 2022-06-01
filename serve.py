#!/usr/bin/env python3
import json
import sys
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from pprint import pprint
from urllib.parse import parse_qs

SCRIPT_DIR = Path(__file__).resolve().absolute().parent

REPLY_POST_DATA_FOR = (
    '/disabled-script-execution/disabled-js-encrypted-form-submission/',
    '/disabled-script-execution/partially-disabled-js-encrypted-form-hook/',
    '/browser-state/unhandled-history-navigation/',
    '/insecure-storage-transmission/insecure-key-transmission/',
)


class SimpleHTTPRequestHandlerSupportingPost(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        data = parse_qs(self.rfile.read(length).decode())
        print('Received post data:')
        pprint(data)

        if self.path in REPLY_POST_DATA_FOR:
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-type", 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'POST_data': data,
            }).encode())
            return

        # handle this request as if it was a GET request
        return self.do_GET()


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('port', action='store',
                        default=8000, type=int,
                        nargs='?',
                        help='Specify alternate port [default: 8000]')
    args = parser.parse_args()

    handler_class = partial(SimpleHTTPRequestHandlerSupportingPost, directory=SCRIPT_DIR)
    with ThreadingHTTPServer(('0.0.0.0', args.port), handler_class) as httpd:
        host, port = httpd.socket.getsockname()[:2]
        url_host = f'[{host}]' if ':' in host else host
        print(
            f"Serving HTTP on {host} port {port} "
            f"(http://{url_host}:{port}/) ..."
        )
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received, exiting.")
            sys.exit(0)

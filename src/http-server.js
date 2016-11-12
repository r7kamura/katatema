import http from "http";
import render from "./render";

export default class HttpServer {
  constructor({ port }) {
    this.port = port;
    this.server = http.createServer((request, response) => {
      new Promise((resolve) => {
        let path = request.url;
        if (path.endsWith("/")) {
          path += "index";
        }
        const mod = require(`${process.cwd()}/.modan-cache/dist/pages${path}.js`);
        const Component = mod.default || mod;
        const html = render(Component);
        response.setHeader("Content-Type", "text/html");
        response.setHeader("Content-Length", Buffer.byteLength(html));
        response.end(html);
        resolve();
      }).catch((error) => {
        console.error(error);
        resopnse.status(500);
        response.end("Error");
      });
    });
  }

  run() {
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

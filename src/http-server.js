import http from "http";
import render from "./render";
import Router from "./router";
import send from "send";

function createRouter() {
  const router = new Router();
  router.get("/javascripts/modan-hot-reloadable-client.js", (request, response, params) => {
    send(request, `${__dirname}/client/modan-hot-reloadable-client.js`).pipe(response);
  });
  router.get("/:path*", (request, response, params) => {
    let path = request.url;
    if (path.endsWith("/")) {
      path += "index";
    }
    const html = render(`pages${path}.js`, { hotReloadable: true });
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Length", Buffer.byteLength(html));
    response.end(html);
  });
  return router;
}

function createServer(router) {
  return http.createServer((request, response) => {
    router.match(request, response);
  });
}

export default class HttpServer {
  constructor({ port }) {
    this.port = port;
  }

  run() {
    const router = createRouter();
    const server = createServer(router);
    return new Promise((resolve, reject) => {
      server.listen(this.port, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

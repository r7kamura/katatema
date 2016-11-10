import http from "http";

export default () => {
  const server = http.createServer((request, response) => {
    new Promise((resolve) => {
      const html = "Hello";
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
  return new Promise((resolve, reject) => {
    server.listen(3000, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

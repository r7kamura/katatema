#!/usr/bin/env node
import HttpServer from "../http-server";
import WebpackServer from "../webpack-server";
import WebpackWatcher from "../webpack-watcher";

new WebpackServer({ port: 4000 }).run().then(() => {
  return new WebpackWatcher().run();
}).then(() => {
  return new HttpServer({ port: 3000 }).run();
}).catch((error) => {
  console.error(error);
  process.exit(1);
});

import fs from "fs";
import Head from "./head";
import Html from "./html";
import React from "react";
import ReactDOMServer from "react-dom/server";

export default function render(relativePagePath, { hotReloadable }) {
  const path = `${process.cwd()}/.modan/server-bundles/${relativePagePath}`
  if (fs.existsSync(path)) {
    const mod = require(path);
    const Component = mod.default || mod;
    const innerHtml = ReactDOMServer.renderToString(<Component/>);
    const componentScript = fs.readFileSync(`.modan/server-bundles/${relativePagePath}`, "utf-8");
    const modanData = { componentScript };
    const html = ReactDOMServer.renderToString(
      <Html
        headChildren={Head.rewind()}
        hotReloadable={hotReloadable}
        innerHtml={innerHtml}
        modanData={modanData}
      />
    );
    return `<!DOCTYPE html>\n${html}\n`;
  }
}

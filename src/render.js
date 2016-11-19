import fs from "fs";
import Head from "./head";
import Html from "./html";
import React from "react";
import ReactDOMServer from "react-dom/server";

export default function render(relativePagePath, { hotReloadable }) {
  const mod = require(`${process.cwd()}/.modan/dist/${relativePagePath}`);
  const Component = mod.default || mod;
  const innerHtml = ReactDOMServer.renderToString(<Component/>);
  const componentScript = fs.readFileSync(`.modan/bundles/${relativePagePath}`, "utf-8");
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

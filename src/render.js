import fs from "fs";
import Head from "./head";
import htmlescape from "htmlescape";
import React from "react";
import ReactDOMServer from "react-dom/server";

class Html extends React.Component {
  render() {
    return(
      <html>
        <head>
          {
            (this.props.headChildren || []).map((child, index) => {
              return React.cloneElement(child, { key: index });
            })
          }
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: this.props.innerHtml }}/>
          <script dangerouslySetInnerHTML={{ __html: `window.modanData = ${htmlescape(this.props.modanData)};` }}/>
        </body>
      </html>
    );
  }
}

export default function render(relativePagePath) {
  const mod = require(`${process.cwd()}/.modan-cache/dist/${relativePagePath}`);
  const Component = mod.default || mod;
  const innerHtml = ReactDOMServer.renderToString(<Component/>);
  const componentScript = fs.readFileSync(`.modan-cache/bundles/${relativePagePath}`, "utf-8");
  const modanData = { componentScript };
  const html = ReactDOMServer.renderToString(<Html headChildren={Head.rewind()} innerHtml={innerHtml} modanData={modanData}/>);
  return `<!DOCTYPE html>\n${html}\n`;
}

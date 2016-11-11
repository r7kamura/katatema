import Head from "./head";
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
        </body>
      </html>
    );
  }
}

export default function render(Component) {
  const innerHtml = ReactDOMServer.renderToString(<Component/>);
  const html = ReactDOMServer.renderToString(<Html headChildren={Head.rewind()} innerHtml={innerHtml}/>);
  return `<!DOCTYPE html>\n${html}`;
}

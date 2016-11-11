import React from "react";
import ReactDOMServer from "react-dom/server";

class Html extends React.Component {
  render() {
    return(
      <html>
        <head></head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

export default function render(Component) {
  const html = ReactDOMServer.renderToString(
    <Html>
      <Component/>
    </Html>
  );
  return `<!DOCTYPE html>\n${html}`;
}

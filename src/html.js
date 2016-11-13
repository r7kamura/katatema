import htmlescape from "htmlescape";
import React from "react";

export default class Html extends React.Component {
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
          <script dangerouslySetInnerHTML={{ __html: `window.modanData = ${htmlescape(this.props.modanData)}` }}/>
          {this.renderClientScript()}
        </body>
      </html>
    );
  }

  renderClientScript() {
    if (this.props.hotReloadable) {
      return <script src="/javascripts/modan-hot-reloadable-client.js"/>;
    } else {
      return <script src="/javascripts/modan-client.js"/>;
    }
  }
}

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
          <script src="/javascripts/modan-client.js"/>
        </body>
      </html>
    );
  }
}

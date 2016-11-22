var loaderUtils = require("loader-utils");

module.exports = function () {};

module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }
  return `
    var result = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
    var React = require("react");
    module.exports = function Style() {
      return React.createElement(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: result.toString()
          }
        }
      );
    };
  `;
};

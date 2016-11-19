module.exports = function (content) {
  this.cacheable();

  return `${content}
    if (module.hot) {
      module.hot.accept();
      if (module.hot.status() !== "idle") {
        var Component = module.exports.default || module.exports;
        window.modan.eventEmitter.emit("update", { Component });
      }
    }
  `;
}

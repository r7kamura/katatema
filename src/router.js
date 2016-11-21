import pathMatch from "path-match";
import url from "url";

const route = pathMatch();

export default class Router {
  constructor() {
    this.routesMap = new Map();
  }

  addRoute(method, path, callback) {
    const routes = this.routesMap.get(method) || new Set();
    routes.add({
      callback,
      match: route(path),
    });
    this.routesMap.set(method, routes);
  }

  get(path, callback) {
    this.addRoute("GET", path, callback);
  }

  match(request, response) {
    const routes = this.routesMap.get(request.method);
    if (routes) {
      const { pathname } = url.parse(request.url);
      for (const route of routes) {
        const parameters = route.match(pathname);
        if (parameters) {
          route.callback(request, response, parameters);
          return;
        }
      }
    }
  }
}

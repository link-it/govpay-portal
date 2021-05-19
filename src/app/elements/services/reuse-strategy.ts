import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';


export class ReuseStrategy implements RouteReuseStrategy {

  reuse: string = 'shouldReuse';
  reuseFrom: string = 'reuseFrom';
  routeOrigin: string;
  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    this.routeOrigin = route.routeConfig.path;
    return route.data[this.reuse] || false;
  }

  store(route: ActivatedRouteSnapshot, handle: {}): void {
    if (route.data[this.reuse]) {
      this.handlers[route.routeConfig.path] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const wasRoutePreviouslyDetached: boolean = !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    if (wasRoutePreviouslyDetached) {
      const reuseVerified = (!route.data[this.reuseFrom] || route.data[this.reuseFrom].indexOf(this.routeOrigin) !== -1);
      if (reuseVerified) {
        return true;
      }
    }
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): {} {
    if (!route.routeConfig) {
      return null;
    }

    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data[this.reuse] || false;
  }

}

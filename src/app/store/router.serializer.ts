import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngxs/router-plugin";

export class RouterStateModel {
  params: any;
  queryParams: any;
  path: string;
}

export class CustomSerializer
  implements RouterStateSerializer<RouterStateModel> {
  serialize(routerState: RouterStateSnapshot): RouterStateModel {
    const { url: path } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { path, queryParams, params };
  }
}

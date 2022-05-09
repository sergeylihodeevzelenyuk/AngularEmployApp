import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable, take } from "rxjs";

import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PreventAuthGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}
  PATH = environment.PATH;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authServ.isLoggedSubject.pipe(
      take(1),
      map((isLogged) => {
        if (!isLogged) {
          return true;
        }

        return this.router.createUrlTree([this.PATH.HOME]);
      })
    );
  }
}

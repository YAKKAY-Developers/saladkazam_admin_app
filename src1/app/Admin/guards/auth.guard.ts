import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  encrypt,
  getRouterUrls,
  LoginRequest,
  LoginResponse,
} from 'src/app/typings';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routerUrls = getRouterUrls();
    // return true;
    // this.router.navigate(["auth/signin"]);
    // return true;
    // this.router.navigate(["auth/signin"]);
    // this.router.navigate(["auth/signin"]);
    // return true;

    if (
      state.url.includes(routerUrls.Login) ||
      state.url.includes(routerUrls.Register)
    ) {
      if (LoginRequest.data) {
        // this.router.navigate([routerUrls.Dashboard]);
        this.router.navigate(['auth/signin']);
        return false;
      }
      return true;
    } else {
      if (LoginRequest.data) {
        return true;
      }
      this.router.navigate(['auth/signin']);
      // this.router.navigate([routerUrls.MyAccount + routerUrls.Login], {
      //   queryParams: { rd: encrypt(state.url) },
      // });
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

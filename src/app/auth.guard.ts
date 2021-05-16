import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     console.log("in auth guard"+this.authService.isLoggedIn);
      // this.authService.isLoggedIn
    if (this.authService.isLoggedIn !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['login'])

    }else{
      // this.router.navigate(['menu'])
      console.log("Already login");
    }
    return true;
  }

}

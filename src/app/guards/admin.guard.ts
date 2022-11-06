import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router, private userService: UsersService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userLogged = this.auth.getUserData();

    if (!userLogged) {
      this.router.navigate(["login"]);
      return false;
    }

    if (!this.userService.isAdmin(userLogged)) {
      this.router.navigate(['welcome'])
      return false;
    }

    return false;
  }

}

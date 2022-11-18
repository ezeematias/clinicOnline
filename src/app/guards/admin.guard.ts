import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
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

    let user: User = JSON.parse(sessionStorage.getItem('user')!);

    if (user.role == 'Admin') {
      return true;
    }

    if (user.role == 'Patient' || user.role == 'Specialist') {
      this.router.navigate(['welcome'])
      return false;
    }

    this.router.navigate(["login"]);
    return false;
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class PermissionsGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router, private userService: UsersService, private modal: ModalService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!sessionStorage.getItem('user')) {
      this.modal.modalMessage("No tienes permiso para esta ruta.", 'info');
      this.router.navigate(["login"]);
      return false;
    } else {
      return true;
    }
  }
}


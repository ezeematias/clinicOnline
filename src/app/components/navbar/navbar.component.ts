import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLogged: Observable<any>;
  userBase: any;
  admin: Observable<User[]> | undefined;
  role: any;

  constructor(private authService: AuthService, private userService: UsersService, private router: Router) {
    this.userLogged = this.authService.getAuth();
    this.userLogged.subscribe((userRef) => {
      this.userService.isLogged = true;
      this.role = this.getRole();
      if (userRef) {
        this.admin = this.userService.getUserEmail(userRef.email, 'users');
        // this.admin.subscribe(user => {
        //   user.forEach(us => this.role = us.role);
        // })
      }
    })
  }

  getRole() {
    let user: User = JSON.parse(sessionStorage.getItem('user')!);   
    return user ? user.role : ''
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit(): Promise<void> {
  }
}

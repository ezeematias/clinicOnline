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
  admin: Observable<any> | undefined;

  constructor(private authService: AuthService, private userService: UsersService, private router: Router) {

    this.userLogged = this.authService.getAuth();
    this.userLogged.subscribe((userRef) => {
      this.userService.isLogged = true;
      this.admin = this.userService.getUserEmail(userRef.email)
    })

    /*
    const auth = this.authService.userCurrent();
    auth.then(res => {
      this.userService.getUserId(res.currentUser?.uid).subscribe((user) => {
        this.userBase = user[0];
        console.log(this.userBase);
        if (user[0].role === 'Admin') {
          this.admin = true;
        } else {
          this.admin = false;
        }
      })
    });*/

  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit(): Promise<void> {
  }
}

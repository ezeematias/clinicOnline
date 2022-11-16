import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.scss']
})
export class MyShiftComponent implements OnInit {

  userLogged = this.authService.getCurrentUser();
  userBase = new User();

  constructor(private userService: UsersService, private authService: AuthService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userLogged.then((res) => {
      this.userService.getUserId(res?.uid).subscribe(user => {
        this.userBase = user[0];
      })
    });
  }

}

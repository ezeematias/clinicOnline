import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.scss']
})
export class PacientListComponent implements OnInit {

  public users: any = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUserAllPatient().subscribe((users) => {
      this.users = users;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(public auth: AuthService,
    public userService: UsersService) { }

  chart: any = [];
  days: string[] = [];

  ngOnInit(): void {
    
  }

}

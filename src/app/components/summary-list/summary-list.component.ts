import { Component, Input, OnInit } from '@angular/core';
import { Summary } from 'src/app/entities/summary';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.scss']
})
export class SummaryListComponent implements OnInit {

  public listSummary: Summary[] = [];
  @Input() user!: User;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getSumariId(this.user.uid!, 'patientUid').subscribe((users) => {
      this.listSummary = users;
    })
  }

}

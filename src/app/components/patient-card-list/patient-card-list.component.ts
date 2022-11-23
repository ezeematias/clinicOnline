import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoCard } from 'src/app/entities/info-card';
import { Summary } from 'src/app/entities/summary';
import { Turns } from 'src/app/entities/turns';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-patient-card-list',
  templateUrl: './patient-card-list.component.html',
  styleUrls: ['./patient-card-list.component.scss']
})
export class PatientCardListComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() turns: Turns[] = [];
  users1: User[] = [];
  turns1: Turns[] = [];
  userLogged = this.authService.getCurrentUser();
  specialist: string = '';

  turnSelected!: Turns;
  summarySelected!: Summary;

  constructor(private userService: UsersService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userLogged.then((res) => {
      this.specialist = res?.uid!;
    });
  }

  count(turns: Turns[]): number {
    return turns.length;
  }

  onClickTurn(turn: Turns, content: any) {
    this.turnSelected = turn;
    this.userService.getSummaryTurnId(turn.id!).then((sus) => {
      if (sus) {
        this.summarySelected = sus[0];
        this.modalService.open(content);
      }
    })
  }
}

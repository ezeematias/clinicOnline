import { Component, Input, OnInit } from '@angular/core';
import { InfoCard } from 'src/app/entities/info-card';
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


  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogged.then((res) => {
      this.specialist = res?.uid!;
    });
    //   this.userService.getTurnId(res?.uid!, "specialistUid").subscribe(turn => {
    //     this.turns1 = turn;
    //     console.log(this.turns1);
    //   })
    // });
    // this.userService.getUserAllPatient().subscribe((users) => {
    //   this.users = users;
    //   console.log(this.users);
    // })
  }
  /*
    async generateInfoCard(users: User[], turns: Turns[]): Promise<InfoCard[]> {
      let newInfoCard: InfoCard[] = [];
      turns.forEach(turn => {
  
      })
  
      return newInfoCard;
    }
  
    searchImg(turn: Turns): string {
      let newTurn = this.users.filter((res) => res.uid == turn.specialistUid)[0];
      return newTurn.photoURL;
    }
  */
    count(turns:Turns[]): number{
      return turns.length;
    }
}

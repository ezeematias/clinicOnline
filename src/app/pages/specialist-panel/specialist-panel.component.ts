import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Turns } from 'src/app/entities/turns';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-specialist-panel',
  templateUrl: './specialist-panel.component.html',
  styleUrls: ['./specialist-panel.component.scss']
})
export class SpecialistPanelComponent implements OnInit {

  userLogged = this.authService.getCurrentUser();
  turns: Turns[] = [];
  users: User[] = [];

  constructor(private userService: UsersService, private authService: AuthService, private modal: ModalService, private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    this.userService.getUserAllPatient().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    })
    this.userLogged.then((res) => {
      this.userService.getTurnId(res?.uid!, "specialistUid").subscribe(turn => {
        this.turns = turn;
        console.log(this.turns);
      })
    });
    this.userService.addTurnsToUser(this.users, this.turns).then(()=> {
    });

  }

  pruebaCard() {
    this.userService.addTurnsToUser(this.users, this.turns).then(()=> {

    });
  }

}

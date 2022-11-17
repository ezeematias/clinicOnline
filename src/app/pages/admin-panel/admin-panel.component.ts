import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  userLogged = this.authService.getAuth();
  userBase = new User();

  constructor(private authService: AuthService, private userService: UsersService, private router: Router, private modal: ModalService) {

  }

  async ngOnInit(): Promise<void> {
    const auth = this.authService.userCurrent();
    await auth.then(res => {
      this.userService.getUserId(res.currentUser?.uid).subscribe((user) => {
        this.userBase = user[0];
      })
    });
  }

  userCurrent() {
    console.log(this.userBase);
    this.modal.modalMessage('Habilitado', 'success');
  }
}

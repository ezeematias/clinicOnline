import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userLogged = this.auth.getAuth();

  constructor(private auth: AuthService, private spinnerService: SpinnerService, private router: Router, private modal: ModalService) { }

  logout() {
    this.spinnerService.show();
    this.auth.logout().catch(error => { this.modal.modalMessage(error.message, "error"); console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ngOnInit(): void {
    this.spinnerService.show();
  }

  ngAfterViewInit(): void {
    this.spinnerService.hide();
  }

}

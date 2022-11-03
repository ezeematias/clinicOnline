import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  providers: [AuthService]
})
export class VerificationComponent implements OnInit {

  public user$: Observable<any> = this.auth.getAuth();
  userLogged = this.auth.getAuth();

  constructor(private auth: AuthService, private afs: AngularFireAuth, private spinnerService: SpinnerService,
    private modal: ModalService) { }

  ngOnInit(): void {
  }

  onSendEmail() {
    //this.spinnerService.show();
    const user = getAuth();
    if (!user.currentUser?.emailVerified) {
      this.auth.sendEmail().then((res) => { this.modal.modalMessage("Correo enviado", "success"); });
    } else {
      this.modal.modalMessage("El correo ya fue verificado", "info");
    }
  }

  logout() {
    this.spinnerService.show();
    this.auth.logout().catch(error => { this.modal.modalMessage(error.message, "error"); console.log("Error en egreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

}

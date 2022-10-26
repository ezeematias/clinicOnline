import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  errorShow: boolean = false;
  errorMessage: string = '';

  constructor(private auth: AuthService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  onSendEmail() {
    this.spinnerService.show();
    this.auth.sendEmail().then((res) => { this.spinnerService.hide(); });
  }

  logout() {
    this.spinnerService.show();
    this.auth.logout().catch(error => { this.errorShow = true; this.errorMessage = error.message; console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

}

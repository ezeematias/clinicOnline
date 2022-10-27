import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  userLogged = this.auth.getAuth();
  errorShow: boolean = false;
  errorMessage: string = '';

  constructor(private auth: AuthService, private spinnerService: SpinnerService, private router: Router) {
  }

  logout() {
    this.spinnerService.show();
    this.auth.logout().catch(error => { this.errorShow = true; this.errorMessage = error.message; console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ngOnInit(): void {
    this.spinnerService.show();
    console.log(this.auth.auth.currentUser);
  }

  ngAfterViewInit(): void {
    this.spinnerService.hide();
    if (this.auth.userCredential != null && !this.auth.userCredential?.emailVerified) {
      this.router.navigate(['verification'])
    }
  }

}

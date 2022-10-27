import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private auth: AuthService, private router: Router, private readonly fb: FormBuilder, private spinnerService: SpinnerService) { }

  usuario = new User();

  errorShow: boolean = false;
  errorMessage: string = '';

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  get emailCtrl(): AbstractControl {
    return this.form.get('email') as FormGroup;
  }

  get passwordCtrl(): AbstractControl {
    return this.form.get('password') as FormGroup;
  }

  ingresar() {
    this.spinnerService.show();
    this.auth.login(this.usuario.email, this.usuario.password).then(res => {
      console.log("Ingresó", res)
    }).catch(error => { this.errorShow = true; this.errorMessage = error.message; console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ingresarConGoogle() {
    this.spinnerService.show();
    this.auth.loginWuthGoogle(this.usuario.email, this.usuario.password).then(res => {
      console.log("Se logueo", res)
    }).catch(error => { this.errorShow = true; this.errorMessage = error.message; console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  autoLogin(): void {
    this.usuario.email = 'auto@session.com';
    this.usuario.password = '123456';
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

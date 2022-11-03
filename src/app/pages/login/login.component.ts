import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { User } from 'src/app/entities/user';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private auth: AuthService, private router: Router,
    private readonly fb: FormBuilder, private spinnerService: SpinnerService,
    private modal: ModalService) {

    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  ingresar(user: User) {
    this.spinnerService.show();
    this.auth.login(user).then(res => {
    }).catch(error => { this.modal.modalMessage(error.message, "error"); console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ingresarConGoogle() {
    this.spinnerService.show();
    this.auth.loginWuthGoogle(this.getValue('email').value, this.getValue('password').value).then(res => {
      console.log("Se logueo", res)
    }).catch(error => { this.modal.modalMessage(error.message, "error"); console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  autoLogin(user: string): void {
    this.form.controls['email'].setValue(`${user}@gmail.com`);
    this.form.controls['password'].setValue('co123456');
  }

  onSubmit() {
    this.ingresar(this.form.value);
  }
}

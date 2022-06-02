import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private readonly fb: FormBuilder, private spinnerService: SpinnerService) { }

  form!: FormGroup;

  usuario = new User();
  rePassword: string = '';

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

  registrar() {
    this.spinnerService.show();
    if (this.usuario.password === this.rePassword) {
      this.auth.register(this.usuario.email, this.usuario.password).catch(error => { this.errorShow = true; this.errorMessage = error.message; console.log("Error de registro", error) }).finally(() => { this.spinnerService.hide(); });

    } else {
      this.errorShow = true;
      this.spinnerService.hide();
      this.errorMessage = 'Las contraseñas no coinciden';
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      rePassword: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
}

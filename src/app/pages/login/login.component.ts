import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { User } from 'src/app/entities/user';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  userLogged = new User();

  constructor(private auth: AuthService, private router: Router,
    private readonly fb: FormBuilder, private spinnerService: SpinnerService,
    private modal: ModalService,
    private userService: UsersService) {

    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  async ingresar(user: User) {
    this.spinnerService.show();
    await this.userService.getUserEmail(user.email).subscribe(async (userRef) => {
      if (userRef) {
        this.userService.userLogged = userRef[0];
      }
    });
    setTimeout(() => {
      if(this.userService.userLogged.registerAdmin){
        this.auth.registerAdmin(this.userService.userLogged).then((res) => {
          this.userService.updateUserUid(user,res);
        })
      }
      if (this.userService.userLogged.enable == true) {
        sessionStorage.setItem('user', JSON.stringify(this.userService.userLogged));
        this.auth.login(user).then().catch(error => { this.modal.modalMessage(error.message, "error"); });
      } else if (this.userService.userLogged.enable == false) {
        this.modal.modalSimple("Usuario pendiente de habilitación","Hablar con un administrador", "info");
      }
      this.spinnerService.hide();
    }, 2000);
  }

  

  ingresarConGoogle() {
    this.spinnerService.show();
    this.auth.loginWuthGoogle(this.getValue('email').value, this.getValue('password').value).then(res => {
      console.log("Se logueo", res)
    }).catch(error => { this.modal.modalMessage(error.message, "error"); console.log("Error en ingreso", error) }).finally(() => { this.spinnerService.hide(); });
  }

  ngOnInit() {
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

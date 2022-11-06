import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/entities/role';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public role: Roles = 'Admin';
  files: any;
  form: FormGroup;
  user = new User();

  constructor(private auth: AuthService,
    private readonly fb: FormBuilder,
    private spinnerService: SpinnerService,
    public userService: UsersService,
    public storage: StorageService,
    private modal: ModalService) {

    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      dni: new FormControl(),
      file: new FormControl(),
      files: new FormControl(),
      socialWork: new FormControl(),
      specialty: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.changeStatus();
    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      rePassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      name: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      age: ['', [Validators.max(120), Validators.min(18)]],
      dni: ['', [Validators.pattern("[0-9]{8}")]],
      file: ['', Validators.maxLength(5000)],
      files: ['', Validators.maxLength(5000)],
      specialty: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      socialWork: ['', [Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  changeStatus() {
    if (this.role == 'Specialist') {
      this.getValue('specialty').addValidators(Validators.required);
      this.getValue('file').addValidators(Validators.required);
      this.getValue('socialWork').clearValidators();
      this.getValue('files').clearValidators();
    } else if (this.role == 'Patient') {
      this.getValue('socialWork').addValidators(Validators.required);
      this.getValue('files').addValidators(Validators.required);
      this.getValue('specialty').clearValidators();
      this.getValue('file').clearValidators();
    } else {
      this.getValue('socialWork').clearValidators();
      this.getValue('files').addValidators(Validators.required);
      this.getValue('specialty').clearValidators();
      this.getValue('file').clearValidators();
    }
    this.getValue('socialWork').updateValueAndValidity();
    this.getValue('specialty').updateValueAndValidity();
    this.getValue('file').updateValueAndValidity();
    this.getValue('files').updateValueAndValidity();
  }

  selector(role: Roles) {
    this.role = role;
    this.changeStatus();
  }

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  uploadImage($event: any) {
    this.files = $event.target.files;
  }

  registerUser() {
    this.spinnerService.show();
    this.user = this.form.value;
    this.user.role = this.role;
    this.user.enable = this.role === 'Specialist' ? false : true;

    if (this.getValue("password").value === this.getValue("rePassword").value) {

      this.modal.modarlCaptcha().then(res => {
        if (res) {
          this.auth.registerPanel(this.form.value, this.files).then((res) => {
          }).catch(error => {
            this.modal.modalMessage(error.message, "error"); console.log("Error de registro", error)
          }).finally(() => {
            this.spinnerService.hide();
          });
        }
        this.spinnerService.hide();
      })
    } else {
      this.spinnerService.hide();
      this.modal.modalMessage('Las contraseñas no coinciden', "error");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  files: any;
  form: FormGroup;
  errorShow: boolean = false;
  errorMessage: string = '';
  isSpecialist: boolean = true;
  user = new User();

  constructor(private auth: AuthService, private router: Router,
    private readonly fb: FormBuilder,
    private spinnerService: SpinnerService,
    public userService: UsersService,
    public storage: StorageService) {

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

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  changeStatus(isSpecialist: boolean) {
    this.isSpecialist = isSpecialist;
    if (this.isSpecialist) {
      this.getValue('specialty').addValidators(Validators.required);
      this.getValue('file').addValidators(Validators.required);
      this.getValue('socialWork').clearValidators();
      this.getValue('files').clearValidators();
    } else {
      this.getValue('socialWork').addValidators(Validators.required);
      this.getValue('files').addValidators(Validators.required);
      this.getValue('specialty').clearValidators();
      this.getValue('file').clearValidators();
    }
    this.getValue('socialWork').updateValueAndValidity();
    this.getValue('specialty').updateValueAndValidity();
    this.getValue('file').updateValueAndValidity();
    this.getValue('files').updateValueAndValidity();
  }

  registerSpecialistOld() {
    this.spinnerService.show();
    this.user = this.form.value;
    this.user.role = this.isSpecialist ? 'Specialist' : 'Patient';
    this.user.enable = this.isSpecialist ? false : true;
    if (this.getValue("password").value === this.getValue("rePassword").value) {
      this.auth.register(this.form.value).then(() => {
        this.storage.updateImages(this.user.email, this.files).then(async () => {
          await this.storage.getImages(this.user.email).then(() => {
            this.auth.uploadUser(this.user.name, this.storage.listUrl[0]);
            this.user.photoURL = this.storage.listUrl[0];
            this.user.imageUrl = [...this.storage.listUrl];
            this.userService.addUser(this.user)?.catch(() => { console.log('Error sending patient') });
          })
        })
      }).catch(error => {
        this.errorShow = true; this.errorMessage = error.message; console.log("Error de registro", error)
      }).finally(() => {
        this.spinnerService.hide();
      });
    } else {
      this.errorShow = true;
      this.spinnerService.hide();
      this.errorMessage = 'Las contraseñas no coinciden';
    }
  }

  uploadImage($event: any) {
    this.files = $event.target.files;
    console.log(this.files);
  }

  ngOnInit(): void {
    this.changeStatus(false);
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
}

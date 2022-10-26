import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Specialist } from 'src/app/entities/specialist';
import { Patient } from 'src/app/entities/patient';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { throws } from 'assert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  files: any;

  constructor(private auth: AuthService, private router: Router,
    private readonly fb: FormBuilder,
    private spinnerService: SpinnerService,
    public firestore: FirestoreService,
    public storage: StorageService) { }

  form!: FormGroup;
  formS!: FormGroup;

  usuario = new User();
  rePassword: string = '';

  errorShow: boolean = false;
  errorMessage: string = '';

  specialist = new Specialist();
  patient = new Patient();

  radio = new FormControl('');

  isSpecialist: boolean = true;

  getValue(value: string): AbstractControl {
    return this.form.get(value) as FormGroup;
  }

  getValueS(value: string): AbstractControl {
    return this.formS.get(value) as FormGroup;
  }

  registerSpecialist() {
    this.spinnerService.show();
    if (this.specialist.password === this.rePassword) {
      this.auth.register(this.specialist.email, this.specialist.password).catch(error => {
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

  registerPatient() {
    this.spinnerService.show();
    if (this.patient.password === this.rePassword) {
      this.auth.register(this.patient.email, this.patient.password).then(() => {
        this.firestore.addPatient(this.patient)?.catch(() => { console.log('Error sending patient') });
      }).catch(error => {
        this.errorShow = true; this.errorMessage = error.message; console.log("Error de registro", error)
      }).then(async res => {
        await this.storage.updateImage(this.patient.email, this.files);
        const urls = this.storage.getImages(this.patient.email);
        await this.auth.uploadUser(this.patient.name, urls[0]);
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
    this.isSpecialist = false;

    this.formS = this.fb.group({
      emailS: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      passwordS: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      rePasswordS: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      nameS: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      lastNameS: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      ageS: ['', [Validators.max(120), Validators.min(18)]],
      dniS: ['', [Validators.minLength(8), Validators.maxLength(9)]],
      fileS: ['', Validators.maxLength(5000)],
      specialist: ['', [Validators.minLength(3), Validators.maxLength(100)]]
    });

    this.form = this.fb.group({
      email: ['', Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      rePassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      name: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      age: ['', [Validators.max(120), Validators.min(18)]],
      dni: ['', [Validators.minLength(8), Validators.maxLength(9)]],
      file: ['', Validators.maxLength(5000)],
      file2: ['', Validators.maxLength(5000)],
      socialWork: ['',]
    });


  }
}

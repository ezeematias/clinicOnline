import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Schedule } from 'src/app/entities/schedule';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementService } from 'src/app/services/management.service';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  userLogged = this.authService.getAuth();
  userRes: any;
  userBase = new User();
  logged: boolean = false;
  sendSpecialty!: string;
  schedule: boolean = false;

  schedulesUser: ScheduleManagement[] = [];
  scheduleSelected = new ScheduleManagement();

  forms: FormGroup;

  constructor(private authService: AuthService, private userService: UsersService,
    private modal: ModalService,
    private fb: FormBuilder, private spinnerService: SpinnerService) {
    this.forms = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      dni: new FormControl(),
      email: new FormControl()
    });
  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(res => {
      if (res != null) {
        this.userService.isLogged = true;
        this.logged = true;
        this.userRes = res;
        this.userService.getUserId(res.uid).subscribe(user => {
          this.userBase = user[0];
          this.forms = this.fb.group({
            email: [this.userBase.email, Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")],
            name: [this.userBase.name, [Validators.minLength(3), Validators.maxLength(20)]],
            lastName: [this.userBase.lastName, [Validators.minLength(3), Validators.maxLength(20)]],
            age: [this.userBase.age, [Validators.max(120), Validators.min(18)]],
            dni: [this.userBase.dni, [Validators.pattern("[0-9]{8}")]],
          });
          this.userService.getScheduleId(this.userBase.uid).subscribe(user => {
            this.schedulesUser = user;
          })
        })
      } else {
        this.logged = false;
      }
    });
  }

  onSubmit() {
  }

  user() {
    console.log(this.userRes);
    this.modal.modalMessage('Habilitado', 'success');
  }

  setImg(img: string) {
    this.authService.uploadPhoto(img);
  }

  specialtySelector(specialty: string) {
    this.sendSpecialty = specialty;
    this.scheduleSelected = this.schedulesUser.filter(fill => fill.specialty == specialty)[0];
  }

  scheduleStatus() {
    this.schedule = !this.schedule;
  }

  addSchedule(schedule: ScheduleManagement) {
    console.log(schedule);
    this.spinnerService.show();
    if (this.scheduleSelected) {
      this.userService.updateSchule(this.scheduleSelected, schedule).then(() => this.modal.modalMessage("Horario cargado correctamente", 'success')).finally(() => this.spinnerService.hide());

    } else {
      this.userService.addSchedule(schedule).then(() => this.modal.modalMessage("Horario cargado correctamente", 'success')).finally(() => this.spinnerService.hide());
    }
  }

  // listSchedule(): Observable<Schedule[]> | any {
  //   if (this.scheduleSelected) {
  //     let result = from(this.scheduleSelected.schedule);
  //     return result as Observable<Schedule[]>
  //   }
  // }
  listSchedule(): Schedule[] | any {
    if (this.scheduleSelected) {
      return this.scheduleSelected.schedule;
    }
  }

}

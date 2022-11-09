import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Schedule } from 'src/app/entities/schedule';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { Specialty } from 'src/app/entities/specialty';

import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.scss']
})
export class MyShiftComponent implements OnInit {

  specialtys: Specialty[] = [];
  specialist: User[] = [];
  specialtySelected: string = '';

  specialityName: string = 'specialityName';
  specialistName: string = 'specialistName';

  schedulesUser: ScheduleManagement[] = [];
  scheduleSelected = new ScheduleManagement();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    let bufferSpe: Specialty[] = [];
    this.userService.getSpecialtyAll().subscribe(spe => {
      spe.forEach(name => {
        bufferSpe.push(name);
      })
    });
    this.specialtys = bufferSpe;
  }

  loadSpecialist() {
    this.specialist = [];
    let bufferUs: User[] = [];
    this.userService.getUserAllSpecialist().subscribe(user => {
      bufferUs = user;
      bufferUs.forEach(user => {
        user.specialty?.forEach(us => {
          if (this.specialtySelected == '' || us == this.specialtySelected) {
            this.specialist.push(user);
          }
        })
      })
    })
  }

  selector(specialty: Specialty) {
    this.specialtySelected = specialty.name!;
    this.loadSpecialist();
  }

  selectorSpe(specialist: User) {
    this.generateTurns(specialist);
  }

  generateTurns(specialist: User) {
    let turns: string[] = [];
    this.userService.getScheduleId(specialist.uid).subscribe(user => {
      this.scheduleSelected = user.filter(fill => fill.specialist === specialist.uid)[0];
      var d = new Date(); // Por ejemplo 1
      var n = this.getDia(new Date().getDay());
      var m = new Date().getDate();
      console.log(d.getDay());
      console.log(m);
      /*
      this.scheduleSelected.schedule.forEach(user => {
        for (let index = 0; index < 15; index++) {
          for ( let j = user.from; j?.hour! < user.to?.hour!; j) {
            const element = array[index];
            
          }
          
        }
      })*/
    });
  }

  getDia(index: number) {
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
    return dia[index];

  }


}

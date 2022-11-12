import { Component, OnInit } from '@angular/core';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { Specialty } from 'src/app/entities/specialty';
import { Turns } from 'src/app/entities/turns';
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
  specialistSelected: string = '';

  specialityName: string = 'specialityName';
  specialistName: string = 'specialistName';
  turnsName: string = 'turnsName';

  schedulesUser: ScheduleManagement[] = [];
  scheduleSelected = new ScheduleManagement();

  turns: Turns[] = [];

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
      bufferUs.forEach(userb => {
        userb.specialty?.forEach(us => {
          if (this.specialtySelected == '' || us.name == this.specialtySelected) {
            this.specialist.push(userb);
          }
        })
      })
    })
  }

  selector(specialty: Specialty) {
    this.specialtySelected = specialty.name!;
    this.loadSpecialist();
  }

  async selectorSpe(specialist: User) {
    this.specialistSelected = specialist.name!;
    let newTurns = this.generateTurnsForDay(specialist);
    setTimeout(() => {
      this.turns = this.filterDayWeek(newTurns, 3);
    }, 300);
  }

  generateTurnsForDay(specialist: User): Turns[] {
    let newTurns: Turns[] = [];
    this.userService.getScheduleId(specialist.uid).subscribe(user => {
      this.scheduleSelected = user.filter(fill => fill.specialist === specialist.uid)[0];
      if (this.scheduleSelected) {
        for (const key in this.scheduleSelected.schedule) {
          let day = new Date();
          day.setHours(this.scheduleSelected.schedule[key].from!.hour);
          day.setMinutes(this.scheduleSelected.schedule[key].from!.minute);
          let hour = day.getHours();
          let minutes = day.getMinutes();
          while (this.scheduleSelected.schedule[key].to!.hour > hour) {
            let turn: Turns = {
              dayWeek: this.scheduleSelected.schedule[key].dayWeek,
              hour: hour,
              minutes: minutes,
            };
            newTurns.push(turn);
            day.setMinutes(minutes + this.scheduleSelected.timeShift!);
            hour = day.getHours();
            minutes = day.getMinutes();
          }
        }
      }
    });
    return newTurns;
  }

  filterDayWeek(listTurns: Turns[], dayWeek: number): Turns[] {
    let newTurns: Turns[] = [];
    newTurns = listTurns.filter((turn: Turns) => turn.dayWeek === dayWeek);
    return newTurns;
  }

  getDaySpanish(index: number) {
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

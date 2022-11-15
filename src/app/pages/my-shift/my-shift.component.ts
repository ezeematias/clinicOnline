import { Component, OnInit } from '@angular/core';
import { DaysSelec } from 'src/app/entities/days-selec';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { Specialty } from 'src/app/entities/specialty';
import { Turns } from 'src/app/entities/turns';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
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

  allTurns: Turns[] = [];
  availableTurn: Turns[] = [];

  turns: Turns[] = [];
  turnsReserved: Turns[] = [];
  days: DaysSelec[] = [];

  daySelected = new DaysSelec();
  turnSelected = new Turns();

  user: string = '';

  constructor(private auth: AuthService, private userService: UsersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.auth.currentUser().then(user => this.user = user);
    let bufferSpe: Specialty[] = [];
    this.userService.getSpecialtyAll().subscribe(spe => {
      spe.forEach(name => {
        switch (name.name) {
          case 'Clínico':
            name.photoURL = "../../../assets/clinic.png";
            break;
          case 'Ortodoncia':
            name.photoURL = "../../../assets/dentist.png";
            break;
          case 'Psiquiatra':
            name.photoURL = "../../../assets/psychiatrist.png";
            break;
          case 'Cardiólogo':
            name.photoURL = "../../../assets/cardiologist.png";
            break;
          default:
            name.photoURL = "../../../assets/specialty.png";
            break;
        }
        bufferSpe.push(name);
      })
    });
    this.specialtys = bufferSpe;
  }

  addTurn() {
    if (this.turnSelected.name) {
      this.userService.addTurn({
        name: this.daySelected.name,
        specialist: this.specialistSelected,
        specialty: this.specialtySelected,
        patient: this.user,
        date: this.daySelected.date,
        day: this.daySelected.day,
        dayWeek: this.daySelected.dayWeek,
        month: this.daySelected.month,
        hour: this.turnSelected.hour,
        minutes: this.turnSelected.minutes,
        poll: 'a',
        rating: 0,
        status: 'Reserved',
      })
    } else {
      this.modal.modalMessage("Debe seleccionar el turno correctamente", 'error');
    }
  }

  loadSpecialist() {
    this.resetInputs();
    this.specialist = [];
    this.days = [];
    this.allTurns = [];
    this.availableTurn = [];
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

  resetInputs() {
    this.turnSelected = new Turns();
    this.daySelected = new DaysSelec();
  }

  selector(specialty: Specialty) {
    this.specialtySelected = specialty.name!;
    this.loadSpecialist();
  }

  async selectorSpe(specialist: User) {
    this.resetInputs();
    this.specialistSelected = specialist.name!;
    this.allTurns = this.generateTurnsForDay(specialist);
    setTimeout(() => {
      this.userService.getReservedTurns(this.specialistSelected).then(spe => {
        this.turnsReserved = spe!;
        this.days = this.getDaysAvailables(this.allTurns);
        console.log(this.days);
      })
    }, 300);
  }

  selectorTurn(turn: Turns) {
    this.turnSelected = turn;
  }
  selectorDay(day: DaysSelec) {
    this.turnSelected = new Turns();
    this.daySelected = day;
    this.availableTurn = this.allTurns;
    this.customerTurns(this.availableTurn, this.turnsReserved!);
  }

  buttonTest() {
    console.log(this.turnSelected);
  }

  //Turn List, lo único que tiene es los horarios por una semana. Hay que chequear las 2 semanas.
  customerTurns(turnList: Turns[], reservedTurn: Turns[]) {
    //console.log(this.daySelected)
    // console.log("OOOOOOOOOO")
    // console.log(reservedTurn)
    // console.log("OOOOOOOOOO")
    turnList.forEach(res => {
      //console.log(res);
      //console.log(`Día => ${this.daySelected.day} Mes => ${this.daySelected.month} // Hora => ${res.hour} Minutos => ${res.minutes}  `);

      if (reservedTurn.find(find => find.day == this.daySelected.day && find.dayWeek == res.dayWeek && find.hour == res.hour && find.minutes == res.minutes && find.month == this.daySelected.month)) {
        res.status = 'Reserved';
        console.log("Entré")
      }
    })
  }

  getDaysAvailables(listTurns: Turns[]): DaysSelec[] {
    let daysAvailables: DaysSelec[] = [];
    let day = new Date();
    let fortnight = day.getDate() + 14;

    for (let index = day.getDate(); index < fortnight; day.setDate(day.getDate() + 1), index++) {
      if (listTurns.find(res => res.dayWeek == day.getDay())) {
        daysAvailables.push({
          name: this.getDaySpanish(day.getDay()),
          dayWeek: day.getDay(),
          day: day.getDate(),
          month: day.getMonth(),
          date: day,
        });
      }
    }
    return daysAvailables;
  }

  // generateAvailableDays(specialist: User) {
  //   this.userService.getScheduleId(specialist.uid).subscribe(user => {
  //     this.scheduleSelected = user.filter(fill => fill.specialist === specialist.uid)[0];
  //     let day = new Date();
  //     let fortnight = day.getDate() + 14;
  //     let firstDay = new Date();
  //     for (let index = firstDay.getDate(); index < fortnight; day.setDate(day.getDate() + 1)) {
  //     }
  //   });
  // }

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
              name: `${this.scheduleSelected.schedule[key].dayWeek}-${hour}-${minutes}`
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

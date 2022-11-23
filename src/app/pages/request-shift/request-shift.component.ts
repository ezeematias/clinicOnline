import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { DaysSelec } from 'src/app/entities/days-selec';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { Specialty } from 'src/app/entities/specialty';
import { Turns } from 'src/app/entities/turns';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-request-shift',
  templateUrl: './request-shift.component.html',
  styleUrls: ['./request-shift.component.scss']
})
export class RequestShiftComponent implements OnInit {

  specialtys: Specialty[] = [];
  specialist: User[] = [];
  patient: User[] = [];
  specialtySelected: string = '';
  specialistSelected = new User();
  patientSelected: User | null = null;

  specialityName: string = 'specialityName';
  specialistName: string = 'specialistName';
  patentName: string = 'patentName';
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
  userLogged = this.authService.getCurrentUser();
  userBase = new User();

  constructor(private router: Router, private authService: AuthService, private userService: UsersService, private modal: ModalService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.authService.currentUser().then(user => this.user = user);
    this.userLogged.then((res) => {
      this.userService.getUserId(res?.uid).subscribe(user => {
        this.userBase = user[0];
      })
    });
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
    this.userService.getUserAllPatient().subscribe(pat => {
      this.patient = pat;
    });
  }

  addTurn() {
    this.spinnerService.show();
    let time: string;
    if (this.turnSelected.hour! > 12) {
      time = `${this.turnSelected.hour! - 12}:${this.turnSelected.minutes == 0 ? '00' : this.turnSelected.minutes}pm`;
    } else {
      time = `${this.turnSelected.hour!}:${this.turnSelected.minutes == 0 ? '00' : this.turnSelected.minutes}am`;
    }
    if ((this.turnSelected.name && this.userBase.role != 'Admin') || (this.turnSelected.name && this.patientSelected != null)) {
      let newTurn: Turns = {
        name: this.daySelected.name,
        nameDate: `${this.daySelected.name} ${this.daySelected.day}/${this.daySelected.month} ${time}`,
        specialist: `${this.specialistSelected.name} ${this.specialistSelected.lastName}`,
        specialistUid: this.specialistSelected.uid,
        specialty: this.specialtySelected,
        patient: this.userBase.role != 'Admin' ? `${this.userBase.name} ${this.userBase.lastName}` : `${this.patientSelected!.name} ${this.patientSelected!.lastName}`,
        patientUid: this.userBase.role != 'Admin' ? this.user : this.patientSelected!.uid,
        date: this.daySelected.date,
        day: this.daySelected.day,
        dayWeek: this.daySelected.dayWeek,
        month: this.daySelected.month,
        hour: this.turnSelected.hour,
        minutes: this.turnSelected.minutes,
        status: 'Reserved',
      }
      this.userService.addTurn(newTurn).then(() => {
        this.modal.modalSimple("Reserva", "Se reservó el turno correctamente", 'success');
        this.router.navigate(['/home/turns'])
      }).catch(error => { console.log(error); this.modal.modalMessage("Hubo un error con el usuario logueado. \nCierre sesión y vuelva a iniciar", 'error') }).finally(() => this.spinnerService.hide())
    } else {
      this.modal.modalMessage("Debe seleccionar el turno correctamente", 'error');
      this.spinnerService.hide();
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
    this.specialistSelected = specialist;
    this.allTurns = this.generateTurnsForDay(specialist);
    setTimeout(() => {
      this.userService.getReservedTurns(this.specialistSelected).then(spe => {
        this.turnsReserved = spe!;
        this.days = this.getDaysAvailables(this.allTurns);
        this.availableTurn = this.availableTurns(this.allTurns);

        console.log(this.days);
        console.log(this.availableTurn);
      })
    }, 300);
  }
  async selectorPat(patient: User) {
    this.patientSelected = patient;
  }

  selectorTurn(turn: Turns) {
    this.turnSelected = turn;
  }

  selectorDay(day: DaysSelec) {
    this.turnSelected = new Turns();
    this.daySelected = day;
    this.customerTurns(this.availableTurn, this.turnsReserved!);
  }

  availableTurns(listTurns: Turns[]): Turns[] {
    let newTurns: Turns[] = [];
    this.days.forEach(days => {
      listTurns.forEach(turn => {
        if (turn.dayWeek == days.dayWeek) {
          let auxTurn: Turns = {
            day: days.day,
            dayWeek: turn.dayWeek,
            hour: turn.hour,
            minutes: turn.minutes,
            month: days.month,
            name: `${days.name} ${days.day}/${days.month} ${turn.hour}:${turn.minutes}`
          }
          newTurns.push(auxTurn);
        }
      })
    })
    return newTurns;
  }

  buttonTest() {
    console.log(this.turnSelected);
  }

  customerTurns(turnList: Turns[], reservedTurn: Turns[]) {
    turnList.forEach(res => {

      if (reservedTurn.find(find => find.day == res.day && find.dayWeek == res.dayWeek && find.hour == res.hour && find.minutes == res.minutes && find.month == find.month &&
        find.status != 'Cancelled')) {
        res.status = 'Reserved';
      }
    })
  }

  getDaysAvailables(listTurns: Turns[]): DaysSelec[] {
    let daysAvailables: DaysSelec[] = [];
    let day = new Date();
    let fortnight = day.getDate() + 14;

    for (let index = day.getDate(); index < fortnight; day.setDate(day.getDate() + 1), index++) {
      if (listTurns.find(res => res.dayWeek == day.getDay())) {
        let auxDay: DaysSelec = {
          name: this.getDaySpanish(day.getDay()),
          dayWeek: day.getDay(),
          day: day.getDate(),
          month: day.getMonth(),
          date: day,
        }
        daysAvailables.push(auxDay);
      }
    }
    return daysAvailables;
  }

  generateTurnsForDay(specialist: User): Turns[] {
    let newTurns: Turns[] = [];
    this.userService.getScheduleId(specialist.uid).subscribe(user => {
      this.scheduleSelected = user.filter(fill => (fill.specialist === specialist.uid && fill.specialty?.name == this.specialtySelected))[0];

      if (this.scheduleSelected.specialty?.name == this.specialtySelected) {
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

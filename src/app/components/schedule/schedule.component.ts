import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { Roles } from 'src/app/entities/role';
import { Days, Schedule } from 'src/app/entities/schedule';
import { ScheduleManagement } from 'src/app/entities/schedule-management';
import { Specialty } from 'src/app/entities/specialty';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnChanges {

  @Input() specialtyParent!: Specialty;
  @Input() specialistParent!: string;
  @Input() listSchedule!: Schedule[];
  @Output() scheduleManag = new EventEmitter<ScheduleManagement>();


  scheduleMan = new ScheduleManagement();

  specialty!: any;

  scheduleShift: Schedule[] = []

  sundayFlag: boolean = false;
  sundayTimeFrom = { hour: 9, minute: 0 };
  sundayTimeTo = { hour: 17, minute: 0 };

  mondayFlag: boolean = false;
  mondayTimeFrom = { hour: 9, minute: 0 };
  mondayTimeTo = { hour: 17, minute: 0 };

  tuesdayFlag: boolean = false;
  tuesdayTimeFrom = { hour: 9, minute: 0 };
  tuesdayTimeTo = { hour: 17, minute: 0 };

  wednesdayFlag: boolean = false;
  wednesdayTimeFrom = { hour: 9, minute: 0 };
  wednesdayTimeTo = { hour: 17, minute: 0 };

  thursdayFlag: boolean = false;
  thursdayTimeFrom = { hour: 9, minute: 0 };
  thursdayTimeTo = { hour: 17, minute: 0 };

  fridayFlag: boolean = false;
  fridayTimeFrom = { hour: 9, minute: 0 };
  fridayTimeTo = { hour: 17, minute: 0 };

  saturdayFlag: boolean = false;
  saturdayTimeFrom = { hour: 9, minute: 0 };
  saturdayTimeTo = { hour: 17, minute: 0 };

  timeTurn: number = 30;

  constructor(public config: NgbTimepickerConfig, private modal: ModalService) {
    config.size = 'small';

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['specialtyParent']) {
      this.ngOnInit();
    }
  }
  setButtonFalse() {
    this.sundayFlag = false;
    this.mondayFlag = false;
    this.tuesdayFlag = false;
    this.wednesdayFlag = false;
    this.thursdayFlag = false;
    this.fridayFlag = false;
    this.saturdayFlag = false;
  }
  ngOnInit(): void {
    this.setButtonFalse();
    if (this.listSchedule) {

      this.listSchedule.forEach((res: Schedule) => {
        if (res.day === 'sunday') {
          this.sundayFlag = true;
          this.sundayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.sundayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'monday') {
          this.mondayFlag = true;
          this.mondayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.mondayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'tuesday') {
          this.tuesdayFlag = true;
          this.tuesdayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.tuesdayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'wednesday') {
          this.wednesdayFlag = true;
          this.wednesdayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.wednesdayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'thursday') {
          this.thursdayFlag = true;
          this.thursdayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.thursdayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'friday') {
          this.fridayFlag = true;
          this.fridayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.fridayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
        if (res.day === 'saturday') {
          this.saturdayFlag = true;
          this.saturdayTimeFrom = res.from ? res.from : { hour: 9, minute: 0 };
          this.saturdayTimeTo = res.to ? res.to : { hour: 17, minute: 0 };
        }
      });
    }
  }

  enable(day: string) {
  }

  sendSchedule() {
    this.scheduleMan.schedule = [];
    let output = true;
    this.scheduleMan.specialist = this.specialistParent;
    this.scheduleMan.specialty = this.specialtyParent;

    if (this.sundayFlag) {
      if (this.sundayTimeFrom.hour > this.sundayTimeTo.hour || this.sundayTimeFrom.hour == this.sundayTimeTo.hour && this.sundayTimeFrom.minute >= this.sundayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(0, 'sunday', this.sundayTimeFrom, this.sundayTimeTo));
      }
    }
    if (this.mondayFlag) {
      if (this.mondayTimeFrom.hour > this.mondayTimeTo.hour || this.mondayTimeFrom.hour == this.mondayTimeTo.hour && this.mondayTimeFrom.minute >= this.mondayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(1, 'monday', this.mondayTimeFrom, this.mondayTimeTo));
      }
    }
    if (this.tuesdayFlag) {
      if (this.tuesdayTimeFrom.hour > this.tuesdayTimeTo.hour || this.tuesdayTimeFrom.hour == this.tuesdayTimeTo.hour && this.tuesdayTimeFrom.minute >= this.tuesdayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(2, 'tuesday', this.tuesdayTimeFrom, this.tuesdayTimeTo));

      }
    }
    if (this.wednesdayFlag) {
      if (this.wednesdayTimeFrom.hour > this.wednesdayTimeTo.hour || this.wednesdayTimeFrom.hour == this.wednesdayTimeTo.hour && this.wednesdayTimeFrom.minute >= this.wednesdayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(3, 'wednesday', this.wednesdayTimeFrom, this.wednesdayTimeTo));

      }
    }
    if (this.thursdayFlag) {
      if (this.thursdayTimeFrom.hour > this.thursdayTimeTo.hour || this.thursdayTimeFrom.hour == this.thursdayTimeTo.hour && this.thursdayTimeFrom.minute >= this.thursdayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(4, 'thursday', this.thursdayTimeFrom, this.thursdayTimeTo));

      }
    }
    if (this.fridayFlag) {
      if (this.fridayTimeFrom.hour > this.fridayTimeTo.hour || this.fridayTimeFrom.hour == this.fridayTimeTo.hour && this.fridayTimeFrom.minute >= this.fridayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(5, 'friday', this.fridayTimeFrom, this.fridayTimeTo));

      }
    }
    if (this.saturdayFlag) {
      if (this.saturdayTimeFrom.hour > this.saturdayTimeTo.hour || this.saturdayTimeFrom.hour == this.saturdayTimeTo.hour && this.saturdayTimeFrom.minute >= this.saturdayTimeTo.minute) {
        output = false;
      } else {
        this.scheduleMan.schedule?.push(this.setSchedule(6, 'saturday', this.saturdayTimeFrom, this.saturdayTimeTo));
      }
    }
    this.scheduleMan.timeShift = this.timeTurn;

    if (output) {
      this.scheduleManag.emit(this.scheduleMan);
    } else {
      this.modal.modalMessage("Los horarios de inicio no pueden ser superiores a los de finalización", 'error');
    }
  }

  setSchedule(dayWeek: number, day: Days, from: { hour: number, minute: number }, to: { hour: number, minute: number }): Schedule {
    let newSchedule: Schedule = { dayWeek: dayWeek, day: day, from: from, to: to }
    return newSchedule;
  }
}

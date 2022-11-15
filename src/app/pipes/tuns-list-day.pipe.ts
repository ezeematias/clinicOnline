import { Pipe, PipeTransform } from '@angular/core';
import { DaysSelec } from '../entities/days-selec';
import { Turns } from '../entities/turns';

@Pipe({
  name: 'tunsListDay'
})
export class TunsListDayPipe implements PipeTransform {

  transform(value: Turns[], key: DaysSelec, ...args: unknown[]): Turns[] {
    let newList: Turns[] = [];
    let day = new Date();
    if (value) {
      value.forEach(res => {
        console.log("PIPI ===")
        console.log(res)
        console.log("PIPI ===")
        if (day.getDate() == key.day && day.getHours() <= res.hour! && day.getMinutes() < res.minutes! && key.dayWeek == res.dayWeek && res.status != 'Reserved') {
          newList.push(res);
        } else if (day.getDate() != key.day && key.dayWeek == res.dayWeek && res.status != 'Reserved') {
          newList.push(res);
        }
      });
    }
    return newList;
  }
}

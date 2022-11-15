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
        if (day.getDate() == key.day && day.getHours() <= res.hour! && day.getMinutes() < res.minutes! && key.day == res.day && res.status != 'Reserved') {
          newList.push(res);
        } else if (day.getDate() != key.day && key.day == res.day && res.status != 'Reserved') {
          newList.push(res);
        }
      });
    }
    return newList;
  }
}

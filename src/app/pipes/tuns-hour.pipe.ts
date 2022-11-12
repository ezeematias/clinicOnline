import { Pipe, PipeTransform } from '@angular/core';
import { Turns } from '../entities/turns';

@Pipe({
  name: 'tunsHour'
})
export class TunsHourPipe implements PipeTransform {

  transform(value: Turns, ...args: unknown[]): string {
    let newTurn = new Turns();

    if (value.hour! > 12) {
      newTurn.name = `${value.hour! - 12}:${value.minutes == 0 ? '00' : value.minutes}pm`;
    } else {
      newTurn.name = `${value.hour!}:${value.minutes == 0 ? '00' : value.minutes}am`;
    }
    return newTurn.name!;
  }
}

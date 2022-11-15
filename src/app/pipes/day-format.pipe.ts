import { Pipe, PipeTransform } from '@angular/core';
import { DaysSelec } from '../entities/days-selec';

@Pipe({
  name: 'dayFormat'
})
export class DayFormatPipe implements PipeTransform {

  transform(value: DaysSelec, ...args: unknown[]): unknown {
    return `${value.name} ${value.day}/${value.month}`;
  }

}

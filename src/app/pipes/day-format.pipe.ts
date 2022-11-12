import { Pipe, PipeTransform } from '@angular/core';
import { DaysSelec } from '../entities/days-selec';

@Pipe({
  name: 'dayFormat'
})
export class DayFormatPipe implements PipeTransform {
  
  //OJO CON EL DÍA
  transform(value: DaysSelec, ...args: unknown[]): unknown {
    return `${value.dayWeek}/${value.name}`;
  }

}

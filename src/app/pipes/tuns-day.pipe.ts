import { Pipe, PipeTransform } from '@angular/core';
import { Turns } from '../entities/turns';

@Pipe({
  name: 'tunsDay'
})
export class TunsDayPipe implements PipeTransform {

  transform(value: Turns, ...args: unknown[]): string {
    return `${value.day}/${value.date}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Summary } from '../entities/summary';

@Pipe({
  name: 'formatDay'
})
export class FormatDayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let time = value.date;

    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000,
    );

    return `${fireBaseTime.getDate()}/${fireBaseTime.getMonth()}/22`;
  }

}

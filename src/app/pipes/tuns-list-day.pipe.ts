import { Pipe, PipeTransform } from '@angular/core';
import { Turns } from '../entities/turns';

@Pipe({
  name: 'tunsListDay'
})
export class TunsListDayPipe implements PipeTransform {

  transform(value: Turns[], ...args: unknown[]): Turns[] {
    let newList: Turns[] = [];
    if (value) {

      console.log(value[0].date?.getDay());
      value.forEach(turn => {
        console.log(turn.date?.getDay());
        if (!newList.find(newTurn => newTurn.date?.getDay() === turn.date?.getDay())) {
          newList.push(turn);
        }
      })
    }
    return newList;
  }

}

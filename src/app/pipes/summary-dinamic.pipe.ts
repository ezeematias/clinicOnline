import { Pipe, PipeTransform } from '@angular/core';
import { Summary } from '../entities/summary';

@Pipe({
  name: 'summaryDinamic'
})
export class SummaryDinamicPipe implements PipeTransform {

  transform(value: Summary, count: number, ...args: unknown[]): string {
    let output: string = '';
    switch (count) {
      case 1:
        output = value.name1 ? `${value.name1}: ${value.value1}` : '';
        break;
      case 2:
        output = value.name2 ? `${value.name2}: ${value.value2}` : '';
        break;
      case 3:
        output = value.name3 ? `${value.name3}: ${value.value3}` : '';
        break;
      case 4:
        output = value.name4 ? `${value.name4}: ${value.value4}` : '';
        break;
      case 5:
        output = value.name5 ? `${value.name5}: ${value.value5}` : '';
        break;
      case 6:
        output = value.name6 ? `${value.name6}: ${value.value6}` : '';
        break;
      default:
        output = 'n/n';
        break;
    }
    return output;
  }

}

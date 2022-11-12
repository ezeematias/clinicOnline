import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listTostring'
})
export class ListTostringPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): string {
    let output: string = '';
    let fist: boolean = true;
    value.forEach(item => {
      output += fist ? item.name : `, ${item.name}`
      fist = false;
    })
    return output;
  }

}

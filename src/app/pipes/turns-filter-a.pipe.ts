import { Pipe, PipeTransform } from '@angular/core';
import { Turns } from '../entities/turns';

@Pipe({
  name: 'turnsFilterA'
})
export class TurnsFilterAPipe implements PipeTransform {

  transform(items: Turns[], keyword: any, properties: string[]): Turns[] {
    if (!items) return [];
    if (!keyword) return items;
    debugger;
    return items.filter(item => {
      var itemFound: Boolean = false;
      for (let i = 0; i < properties.length; i++) {
        if (item.patient!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.specialty!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.specialist!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.status!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.nameDate!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
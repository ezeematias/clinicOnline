import { Pipe, PipeTransform } from '@angular/core';
import { Summary } from '../entities/summary';
import { FormatDayPipe } from './format-day.pipe';

@Pipe({
  name: 'summaryFilterSmall'
})
export class SummaryFilterSmallPipe implements PipeTransform {

  transform(items: Summary[], keyword: any, properties: string[]): Summary[] {
    if (!items) return [];
    if (!keyword) return items;
    debugger;
    return items.filter(item => {
      var itemFound: Boolean = false;
      for (let i = 0; i < properties.length; i++) {
        if (item.specialist!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.specialty!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.height!.toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.weight!.toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.temperature!.toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        if (item.pressure!.toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
        let dayFormat = new FormatDayPipe().transform(item);
        if (dayFormat!.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
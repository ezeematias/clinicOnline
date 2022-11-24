import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../entities/status';

@Pipe({
  name: 'statusTra'
})
export class StatusTraPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let output = '';
    if (value == 'Accepted') {
      output = 'Aceptado';
    }
    if (value == 'Available') {
      output = 'Habilitado';
    }
    if (value == 'Cancelled') {
      output = 'Cancelado';
    }
    if (value == 'Finalized') {
      output = 'Finalizado';
    }
    if (value == 'Refused') {
      output = 'Rechazado';
    }
    if (value == 'Reserved') {
      output = 'Pendiente';
    }
    return output;
  }
}

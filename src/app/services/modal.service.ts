import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

export type icon = 'warning' | 'error' | 'success' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor() { }

  modalMessage(msg: string, icon: icon) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  async modalCancel(msg: string): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: "No se podrá revertir la eliminación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Si, eliminarlo'
    });
  }

  async modalCancelConfirm(): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: "No se podrá revertir la eliminación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    });
  }

  modalSimple(title: string, msg: string, icon: icon) {
    Swal.fire(
      title,
      msg,
      icon
    )
  }
}

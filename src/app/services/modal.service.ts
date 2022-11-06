import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

export type icon = 'warning' | 'error' | 'success' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  captcha: any = [];

  constructor() { }

  modalMessage(msg: string, icon: icon) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 2000
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

  async modarlCaptcha(): Promise<boolean> {
    let captcha = []
    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
      } else {
        captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
    const theCaptcha = captcha.join("");

    const { value: result } = await Swal.fire({
      title: `Ingrese el código \n\n${theCaptcha}`,
      input: 'text',
      text: '¡No sea un robot!',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      inputValidator: (value) => {
        if (!value || value != theCaptcha) {
          return 'El código ingresado es incorrecto.'
        } else {
          return null;
        }
      }
    })
    if (result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Captcha correcto',
        showConfirmButton: false,
        timer: 1500
      })
      return true;
    }
    return false;
  }
}
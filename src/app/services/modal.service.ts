import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CaptchaComponent } from '../components/captcha/captcha.component';
import { CaptchaDirective } from '../directives/captcha.directive';
import { Captcha2Directive } from '../directives/captcha2.directive';
import { Specialty } from '../entities/specialty';

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
  modalMessageOk(msg: string, icon: icon) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: msg,
      confirmButtonText: 'Cerrar'
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
  async modalCancelConfirmMsg(title: string, txt: string, icon: icon, btnMsg: string): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title: title,
      text: txt,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: `Si, ${btnMsg}`,
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

  async modalText(): Promise<Specialty> {
    const { value: result } = await Swal.fire({
      title: 'Nueva especialidad',
      input: 'text',
      inputLabel: 'Ingrese especialidad',
      inputPlaceholder: 'especialidad',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar la especialidad'
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
      let newSpecialty = new Specialty();
      newSpecialty.name = result;
      newSpecialty.id = '15';
      return newSpecialty;
    }
    return result;
  }

  async modalInputTextCancel(): Promise<string> {
    const { value: result } = await Swal.fire({
      title: 'Motivo de cancelación',
      input: 'text',
      inputLabel: 'Ingrese su motivo',
      inputPlaceholder: 'Motivo',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar el motivo'
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
    }
    return result;
  }

  async modalInputText(title: string, inputLabel: string, inputPlaceholder: string): Promise<string> {
    const { value: result } = await Swal.fire({
      title: title,
      input: 'text',
      inputLabel: inputLabel,
      inputPlaceholder: inputPlaceholder,
      inputValidator: (value) => {
        if (!value) {
          return `Debe ingresar ${inputPlaceholder}`
        } else {
          return null;
        }
      }
    })

    if (result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correcto',
        showConfirmButton: false,
        timer: 1500
      })
    }
    return result;
  }

  async modarlCaptcha(): Promise<boolean> {
    // let captcha = []
    // for (let q = 0; q < 6; q++) {
    //   if (q % 2 == 0) {
    //     captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    //   } else {
    //     captcha[q] = Math.floor(Math.random() * 10 + 0);
    //   }
    // }
    // const theCaptcha = captcha.join("");
    let captcha2 = new Captcha2Directive().createCaptcha();

    const { value: result } = await Swal.fire({
      title: `Ingrese el código \n\n${captcha2}`,
      input: 'text',
      text: '¡No sea un robot!',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      inputValidator: (value) => {
        if (!value || value != captcha2) {
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
import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appCaptcha2]'
})
export class Captcha2Directive {

  @Output() captchaResult = new EventEmitter<string>();

  constructor() { }

  createCaptcha() {
    let captcha = []
    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
      } else {
        captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
    const theCaptcha = captcha.join("");
    return theCaptcha;
  }
}

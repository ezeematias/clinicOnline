import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  captcha: any = [];
  enteredCaptcha: any;
  generateCaptcha: any;
  captchaForDirective: any;
  @Output() captchaResult = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    //this.createCaptcha();
  }

  onChange(value: any) {
    if (value.length == 6) {
      setTimeout(() => {
        //this.validateCaptcha();
        this.captchaForDirective = this.enteredCaptcha;
      }, 200)
    }
  }

  createCaptcha() {
    this.generateCaptcha = true;
    // setTimeout(() => {
    //   this.generateCaptcha = false;
    // }, 200)

    /*
    // Captcha Viejo
    const activeCaptcha = document.getElementById("captcha");
    let captcha = []
    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
      } else {
        captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
    const theCaptcha = captcha.join("");
    this.captcha = theCaptcha;
    activeCaptcha!.innerHTML = `${theCaptcha}`;*/
  }
  /*
    validateCaptcha() {
      this.captchaResult.emit(this.enteredCaptcha === this.captcha);
    }*/

  newCaptcha(captcha: any) {
    this.captcha = captcha;
  }

  captchaResultDirective(captchaResult: any) {
    this.captchaResult.emit(captchaResult);
  }

}

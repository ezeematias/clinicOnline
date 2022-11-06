import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  captcha: any = []
  enteredCaptcha: any;
  @Output() captchaResult = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    this.createCaptcha();
  }

  onChange(value: any) {
    if (value.length == 6) {
      setTimeout(() => {
        this.validateCaptcha();
      }, 200)
    }
  }

  createCaptcha() {
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
    activeCaptcha!.innerHTML = `${theCaptcha}`;
  }

  validateCaptcha() {
    console.log(this.enteredCaptcha)
    console.log(this.captcha)
    this.captchaResult.emit(this.enteredCaptcha === this.captcha);
  }

}

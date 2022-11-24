import { Directive, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective {

  captchaD: any = []

  @Output() captchaResult = new EventEmitter<boolean>();
  @Output() captcha = new EventEmitter<String>();

  @Input() requestCaptcha = false;
  @Input() enteredCaptcha: string = '';

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
    this.captchaD = theCaptcha;
    activeCaptcha!.innerHTML = `${theCaptcha}`;
  }

  validateCaptcha() {
    this.captchaResult.emit(this.enteredCaptcha === this.captchaD);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requestCaptcha']) {
      this.createCaptcha();
    }

    if (changes['enteredCaptcha']) {

      this.validateCaptcha();
    }
  }

}

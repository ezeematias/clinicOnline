import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isCaptcha: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  getCaptcha() {
    let captcha = JSON.parse(sessionStorage.getItem('captcha')!);
    return captcha ? captcha : null;
  }

  getRole() {
    let user: User = JSON.parse(sessionStorage.getItem('user')!);   
    return user ? user.role : ''
  }

  captchaChange() {
    this.isCaptcha = !this.isCaptcha;
    sessionStorage.setItem('captcha', JSON.stringify(this.isCaptcha));
  }

}

import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { moveFromRight, moveFromBottom, moveFromBottomFade, scaleDownFromBottom } from 'ngx-router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveFromRight', [
      transition('* => login', useAnimation(moveFromRight))
    ]),
    trigger('moveFromBottom', [
      transition('* => welcome', useAnimation(moveFromBottom))
    ]),
    trigger('scaleDownFromBottom', [
      transition('* => register', useAnimation(scaleDownFromBottom))
    ]),
  ]
})
export class AppComponent {
  title = 'clinicOnline';

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}


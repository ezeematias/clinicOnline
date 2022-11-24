import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { rotateCubeToRight, slide, rotateFlipToLeft, fromRightEasing, scaleDownFromBottom, rotateFlipToBottom } from 'ngx-router-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('panel', [
      transition('* => panel', useAnimation(fromRightEasing))
    ]),
    trigger('profile', [
      transition('* => profile', useAnimation(rotateCubeToRight))
    ]),
    trigger('turns', [
      transition('* => turns', useAnimation(scaleDownFromBottom))
    ]),
    trigger('request', [
      transition('* => request', useAnimation(rotateCubeToRight))
    ]),
    trigger('panel-shift', [
      transition('* => panel-shift', useAnimation(slide))
    ]),
    trigger('panel-patient', [
      transition('* => panel-patient', useAnimation(rotateFlipToLeft))
    ]),
    trigger('reports', [
      transition('* => reports', useAnimation(rotateFlipToBottom))
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

}

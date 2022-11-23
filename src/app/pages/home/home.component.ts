import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { rotateCubeToRight } from 'ngx-router-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('panel', [
      transition('* => panel', useAnimation(rotateCubeToRight))
    ]),
    trigger('profile', [
      transition('home => profile', useAnimation(rotateCubeToRight))
    ]),
    trigger('turns', [
      transition('home => turns', useAnimation(rotateCubeToRight))
    ]),
    trigger('request', [
      transition('home => request', useAnimation(rotateCubeToRight))
    ]),
    trigger('panel-shift', [
      transition('home => panel-shift', useAnimation(rotateCubeToRight))
    ]),
    trigger('panel-patient', [
      transition('home => panel-patient', useAnimation(rotateCubeToRight))
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

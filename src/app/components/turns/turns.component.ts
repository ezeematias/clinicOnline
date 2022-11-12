import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DaysSelec } from 'src/app/entities/days-selec';
import { Turns } from 'src/app/entities/turns';

@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.scss']
})
export class TurnsComponent implements OnInit {
  @Input() listTurn: Turns[] = [];
  @Input() listDays: DaysSelec[] = [];

  @Output() daySelected = new EventEmitter<DaysSelec>();
  @Output() itemSelected = new EventEmitter<Turns>();

  turns: Turns[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectorDay(item: DaysSelec) {
    this.daySelected.emit(item);
  }

  selector(item: Turns) {
    this.itemSelected.emit(item);
  }

  send() {
    console.log(this.listDays);
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log(this.listTurn);
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
  dayPipe = new DaysSelec();

  constructor() { }

  ngOnInit(): void {
    console.log(this.listDays)
  }

  selectorDay(item: DaysSelec) {
    this.dayPipe = item;
    this.daySelected.emit(item);
  }
  asd() {
    console.log(this.listDays)
  }

  selector(item: Turns) {
    this.itemSelected.emit(item);
  }
}

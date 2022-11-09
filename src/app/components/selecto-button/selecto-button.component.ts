import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selecto-button',
  templateUrl: './selecto-button.component.html',
  styleUrls: ['./selecto-button.component.scss']
})
export class SelectoButtonComponent implements OnInit {

  @Input() listParent?: any[];
  @Input() className?: string;
  @Output() itemSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selector(item: any) {
    this.itemSelected.emit(item);
  }

  datos() {
    console.log(this.listParent);
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() color!: string;
  @Input() mensaje!: string;

  public errorMessage : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

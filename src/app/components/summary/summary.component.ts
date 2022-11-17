import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Summary } from 'src/app/entities/summary';
import { Turns } from 'src/app/entities/turns';
import { ModalService } from 'src/app/services/modal.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private modalService: NgbModal, private readonly fb: FormBuilder, private userService: UsersService, private modal: ModalService, private spinnerService: SpinnerService) {
    this.summary = new FormGroup({
      height: new FormControl(),
      weight: new FormControl(),
      temperature: new FormControl(),
      pressure: new FormControl(),
      name1: new FormControl(),
      value1: new FormControl(),
      name2: new FormControl(),
      value2: new FormControl(),
      name3: new FormControl(),
      value3: new FormControl(),
    })
  }

  summary: FormGroup;

  @ViewChild('content') addview !: ElementRef
  @Input() editSummary!: Summary;
  @Input() turn!: Turns;

  saveresponse: any;
  editdata = new Summary();
  destdata: any;

  getValue(value: string): AbstractControl {
    return this.summary.get(value) as FormGroup;
  }

  ngOnInit(): void {
    this.loadDesignation();
    this.summary = this.fb.group({
      height: ['', [Validators.max(210), Validators.min(50)]],
      weight: ['', [Validators.min(2), Validators.max(500)]],
      temperature: ['', [Validators.min(30), Validators.max(45)]],
      pressure: ['', [Validators.min(60), Validators.max(140)]],
      name1: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      value1: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      name2: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      value2: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      name3: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      value3: ['', [Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  saveSummary() {
    if (this.summary.valid) {
      this.spinnerService.show();
      this.userService.updateTurnsFinnally(this.turn, 'Finalized');
      this.userService.addSummary(this.summary.value, this.turn).then(() => { this.modal.modalSimple("Finalizado", "Se finalizó el turno correctamente", "success"); }).finally(() => this.spinnerService.hide());
      this.modalService.dismissAll();
    }
  }

  loadDesignation() {
    this.editdata = this.editSummary;
  }

  loadEditData(code: any) {
    this.summary.setValue({ height: this.editdata.height, weight: this.editdata.weight, temperature: this.editdata.temperature, pressure: this.editdata.pressure });
  }

  close() {
    this.modalService.dismissAll();
  }
}

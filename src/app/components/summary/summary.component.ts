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
      name4: new FormControl(),
      value4: new FormControl(),
      name5: new FormControl(),
      value5: new FormControl(),
      name6: new FormControl(),
      value6: new FormControl(),
    })

    this.newSummary = {
      height: 0,
      weight: 0,
      temperature: 0,
      pressure: 0,
      name1: '',
      value1: '',
      name2: '',
      value2: '',
      name3: '',
      value3: '',
      name4: '',
      value4: '',
      name5: '',
      value5: '',
      name6: '',
      value6: '',
    }
  }

  summary: FormGroup;

  @ViewChild('content') addview !: ElementRef
  @Input() editSummary!: Summary;
  @Input() turn!: Turns;
  @Input() isDisable!: boolean;

  saveresponse: any;
  destdata: any;
  newSummary = new Summary();
  disabled: boolean = false;

  getValue(value: string): AbstractControl {
    return this.summary.get(value) as FormGroup;
  }

  ngOnInit(): void {
    console.log(`Disable => ${this.isDisable}`)
    this.loadDesignation();

    if (this.disabled) {
      this.summary = this.fb.group({
        height: [this.newSummary.height],
        weight: [this.newSummary.weight],
        temperature: [this.newSummary.temperature],
        pressure: [this.newSummary.pressure],
        name1: [this.newSummary.name1],
        value1: [this.newSummary.value1],
        name2: [this.newSummary.name2],
        value2: [this.newSummary.value2],
        name3: [this.newSummary.name3],
        value3: [this.newSummary.value3],
        name4: [this.newSummary.name4],
        value4: [this.newSummary.value4],
        name5: [this.newSummary.name5],
        value5: [this.newSummary.value5],
        name6: [this.newSummary.name6],
        value6: [this.newSummary.name6],
      });
      this.summary.controls['height'].disable();
      this.summary.controls['weight'].disable();
      this.summary.controls['temperature'].disable();
      this.summary.controls['pressure'].disable();
      this.summary.controls['name1'].disable();
      this.summary.controls['value1'].disable();
      this.summary.controls['name2'].disable();
      this.summary.controls['value2'].disable();
      this.summary.controls['name3'].disable();
      this.summary.controls['value3'].disable();
      this.summary.controls['name4'].disable();
      this.summary.controls['value4'].disable();
      this.summary.controls['name5'].disable();
      this.summary.controls['value5'].disable();
      this.summary.controls['name5'].disable();
      this.summary.controls['name6'].disable();
    } else {
      this.summary = this.fb.group({
        height: ['', [Validators.max(210), Validators.min(50)]],
        weight: ['', [Validators.min(2), Validators.max(500)]],
        temperature: ['', [Validators.min(30), Validators.max(45)]],
        pressure: ['', [Validators.min(60), Validators.max(140)]],
        name1: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value1: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        name2: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value2: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        name3: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value3: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        name4: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value4: ['', [Validators.min(0), Validators.max(100)]],
        name5: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value5: ['', [Validators.min(0), Validators.max(500)]],
        name6: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        value6: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      });
    }
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
    if (this.isDisable) {
      this.disabled = true;
    }
    this.newSummary = this.editSummary;
    //console.log(this.editSummary);
  }

  loadEditData(code: any) {
    this.summary.setValue({ height: this.newSummary.height, weight: this.newSummary.weight, temperature: this.newSummary.temperature, pressure: this.newSummary.pressure });
  }

  close() {
    this.modalService.dismissAll();
  }
}

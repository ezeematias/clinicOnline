import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Specialty } from 'src/app/entities/specialty';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<Specialty[]>();

  specialtys: Specialty[] = [];

  constructor(private userService: UsersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userService.getSpecialtyAll().subscribe(res => {
      this.specialtys = res;
    })
  }

  addSpecialty() {
    this.modal.modalText().then(res => {
      if (res) {
        this.userService.addSpecialty(res);
      }
    })
  }

  selector(item: Specialty) {
    this.specialtys.forEach(res => {
      if (res.name == item.name) {
        res.enable = !res.enable;
      }
    });
    this.itemSelected.emit(this.specialtys.filter(res => res.enable == true));
  }
}

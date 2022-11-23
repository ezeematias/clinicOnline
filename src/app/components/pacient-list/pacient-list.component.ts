import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Turns } from 'src/app/entities/turns';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.scss']
})
export class PacientListComponent implements OnInit {

  public users: any = [];
  isCard = true;

  constructor(private userService: UsersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userService.getUserAllPatient().subscribe((users) => {
      this.users = users;
    })
  }

  downloadUsers() {
    var table_elt = document.getElementById("users-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.writeFile(workbook, "plantilla-usuarios.xlsx");
  }

  changeStyle() {
    this.isCard = !this.isCard;
  }

  downloadTurns(user: User) {
    this.userService.getFinallyTurns(user).then(res => {

      if (res && res.length > 0) {
        var line = 70;
        let turns: Turns[] = res!;
        let PDF = new jsPDF('p', 'mm', 'a4',);
        let pageHeight = (PDF.internal.pageSize.height) - 10;
        PDF.addImage('../../assets/icon.png', 'PNG', 10, 10, 50, 50);
        const date = new Date().toLocaleString();
        PDF.text(`Clínica Online`, 70, 20);
        PDF.text(`Historial de turnos de ${user.name} ${user.lastName}`, 70, 30);
        turns.forEach(turn => {
          PDF.text(`-----------------------------------------------------`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
          PDF.text(`* Fecha: ${turn.nameDate}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
          PDF.text(`* Especialidad: ${turn.specialty}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
          PDF.text(`* Especialista: ${turn.specialist}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;

        })
        PDF.save('historia-clínica.pdf');
      } else {
        this.modal.modalMessage("El paciente no tiene turnos realizados", 'error');
      }
    })
  }


}

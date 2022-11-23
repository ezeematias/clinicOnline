import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Summary } from 'src/app/entities/summary';
import { User } from 'src/app/entities/user';
import { DayFormatPipe } from 'src/app/pipes/day-format.pipe';
import { FormatDayPipe } from 'src/app/pipes/format-day.pipe';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.scss']
})
export class SummaryListComponent implements OnInit {

  public listSummary: Summary[] = [];
  @Input() user!: User;
  isResume = true;
  listSpecialty: string[] = [];

  constructor(private userService: UsersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.userService.getSumariId(this.user.uid!, 'patientUid').subscribe((users) => {
      this.listSummary = users;
      users.forEach(res => {
        if (!this.listSpecialty.find(srch => srch == res.specialty)) {
          this.listSpecialty.push(res.specialty!);
        }
      })
    })
  }

  resume() {
    this.isResume = !this.isResume;
  }

  downloadSummary() {
    if (this.listSummary && this.listSummary.length > 0) {
      var line = 70;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      let pageHeight = (PDF.internal.pageSize.height) - 10;
      PDF.addImage('../../assets/icon.png', 'PNG', 10, 10, 50, 50);
      const date = new Date().toLocaleString();
      PDF.text(`Clínica Online`, 70, 20);
      PDF.text(`${date}`, 150, 10);
      PDF.text(`Historial de turnos de ${this.listSummary[0].patient}`, 70, 30);
      this.listSummary.forEach(turn => {
        let dayFormat = new FormatDayPipe().transform(turn);
        PDF.text(`-----------------------------------------------------`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Atendido por ${turn.specialist} el día ${dayFormat}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialidad: ${turn.specialty}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Altura: ${turn.height}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Peso: ${turn.weight}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Temperatura: ${turn.temperature}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Presión: ${turn.pressure}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        if (turn.name1 != '') {
          PDF.text(`* ${turn.name1}: ${turn.value1}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name2 != '') {
          PDF.text(`* ${turn.name2}: ${turn.value2}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name3 != '') {
          PDF.text(`* ${turn.name3}: ${turn.value3}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name4 != '') {
          PDF.text(`* ${turn.name4}: ${turn.value4}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name5 != '') {
          PDF.text(`* ${turn.name5}: ${turn.value5}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name6 != '') {
          PDF.text(`* ${turn.name6}: ${turn.value6}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
      })
      PDF.save('historia-clínica.pdf');
    } else {
      this.modal.modalMessage("El paciente no tiene historia clínica", 'error');
    }
  }

  downloadForSpecialty(specialty: string) {
    let newList = this.listSummary.filter(fill => fill.specialty == specialty);
    if (newList && newList.length > 0) {
      var line = 70;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      let pageHeight = (PDF.internal.pageSize.height) - 10;
      PDF.addImage('../../assets/icon.png', 'PNG', 10, 10, 50, 50);
      const date = new Date().toLocaleString();
      PDF.text(`${date}`, 150, 10);
      PDF.text(`Clínica Online`, 70, 20);
      PDF.text(`Historial de turnos de ${newList[0].patient}`, 70, 30);
      newList.forEach(turn => {
        let dayFormat = new FormatDayPipe().transform(turn);
        PDF.text(`-----------------------------------------------------`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Atendido por ${turn.specialist} el día ${dayFormat}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialidad: ${turn.specialty}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Altura: ${turn.height}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Peso: ${turn.weight}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Temperatura: ${turn.temperature}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Presión: ${turn.pressure}`, 15, line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        if (turn.name1 != '') {
          PDF.text(`* ${turn.name1}: ${turn.value1}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name2 != '') {
          PDF.text(`* ${turn.name2}: ${turn.value2}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name3 != '') {
          PDF.text(`* ${turn.name3}: ${turn.value3}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name4 != '') {
          PDF.text(`* ${turn.name4}: ${turn.value4}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name5 != '') {
          PDF.text(`* ${turn.name5}: ${turn.value5}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        if (turn.name6 != '') {
          PDF.text(`* ${turn.name6}: ${turn.value6}`, 15, line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
      })
      PDF.save('historia-clínica.pdf');
    } else {
      this.modal.modalMessage("El paciente no tiene turnos realizados", 'error');
    }



  }



}

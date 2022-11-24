import { Component, OnInit } from '@angular/core';
import { Turns } from 'src/app/entities/turns';
import { UsersService } from 'src/app/services/users.service';
import { LineChart } from 'chartist';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-turns-day',
  templateUrl: './turns-day.component.html',
  styleUrls: ['./turns-day.component.scss']
})
export class TurnsDayComponent implements OnInit {

  constructor(private userService: UsersService) { }

  turnRes: any;
  turnAll: Turns[] = [];
  dates: any = [];

  data = {
    labels: [''],
    series: [[]]
  };

  options = {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true
  }

  ngOnInit(): void {
    this.userService.getAllTurns().then(res => {
      this.turnRes = res;
      this.turnAll = [...this.turnRes];
      this.turnAll.forEach(turn => this.dates.push(turn.dayWeek));
      const result = this.dates.reduce((json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }), {});
      let daysWeek = Object.keys(result);
      this.data.labels = [];
      daysWeek.forEach(res => {
        this.data.labels.push(this.getDaySpanish(parseInt(res)));
      })
      console.log(this.data.labels);
      this.data.series.push(Object.values(result));
      console.log(this.data.series);
      new LineChart('#chart1', this.data, this.options);
    })
  }

  getDaySpanish(index: number) {
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
    return dia[index];
  }

  downloadData() {
    /*
    let DATA = <HTMLElement>document.getElementById('pdf');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      var nombreArchivo = 'turnosxEspecialidad.pdf';
      PDF.save(nombreArchivo);
    });
*/
    var imgData;
    html2canvas(document.getElementById('chart1')!).then(function (canvas) {
      imgData = canvas.toDataURL('image');
      let doc = new jsPDF('p', 'mm', 'a4',);
      doc.addImage('../../assets/icon.png', 'PNG', 10, 10, 25, 23);
      const date = new Date().toLocaleString();
      doc.text(`Clínica Online`, 70, 20);
      doc.text(`${date}`, 150, 10);
      doc.text(`Turnos por día`, 70, 30);
      doc.addImage(imgData, 'PNG', 80, 80, 200, 200);
      doc.save('turnos-por-dia.pdf');
    });
  }

}

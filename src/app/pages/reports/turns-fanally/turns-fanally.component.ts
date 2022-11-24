import { Component, OnInit } from '@angular/core';
import { Turns } from 'src/app/entities/turns';
import { UsersService } from 'src/app/services/users.service';
import { BarChart } from 'chartist';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-turns-fanally',
  templateUrl: './turns-fanally.component.html',
  styleUrls: ['./turns-fanally.component.scss']
})
export class TurnsFanallyComponent implements OnInit {

  constructor(private userService: UsersService) { }

  turnRes: any;
  turnAll: Turns[] = [];
  dates: any = [];

  data = {
    labels: [''],
    series: [[]]
  };

  options = {
    stackBars: true,

  }

  ngOnInit(): void {
    this.userService.getAllFinallyTurns().then(res => {
      this.turnRes = res;
      this.turnAll = [...this.turnRes];
      this.turnAll.forEach(turn => this.dates.push(turn.specialist));
      const result = this.dates.reduce((json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }), {});
      let daysWeek = Object.keys(result);
      this.data.labels = [];
      daysWeek.forEach(res => {
        this.data.labels.push(res);
      })
      console.log(this.data.labels);
      this.data.series.push(Object.values(result));
      console.log(this.data.series);

      new BarChart('#chart2', this.data, this.options).on('draw', data => {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 300px'
          });
        }
      });
    })
  }

  downloadData() {
    var imgData;
    html2canvas(document.getElementById('chart2')!).then(function (canvas) {
      imgData = canvas.toDataURL('image');
      let doc = new jsPDF('p', 'mm', 'a4',);
      doc.addImage('../../assets/icon.png', 'PNG', 10, 10, 25, 23);
      const date = new Date().toLocaleString();
      doc.text(`Clínica Online`, 70, 20);
      doc.text(`${date}`, 150, 10);
      doc.text(`Turnos por médico - Finalizados`, 70, 30);
      doc.addImage(imgData, 'PNG', 80, 80, 200, 200);
      doc.save('turnos-finalizados.pdf');
    });
  }
}

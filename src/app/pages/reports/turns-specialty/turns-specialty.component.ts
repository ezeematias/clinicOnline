import { Component, OnInit } from '@angular/core';
import { PieChart, PieChartOptions, ResponsiveOptions } from 'chartist';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Turns } from 'src/app/entities/turns';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-turns-specialty',
  templateUrl: './turns-specialty.component.html',
  styleUrls: ['./turns-specialty.component.scss']
})
export class TurnsSpecialtyComponent implements OnInit {

  constructor(private userService: UsersService) { }

  turnRes: any;
  turnAll: Turns[] = [];
  dates: any = [];

  data = {
    labels: [''],
    series: []
  };

  options: PieChartOptions = {
    labelInterpolationFnc: value => String(value)[0]
  };

  responsiveOptions: ResponsiveOptions<PieChartOptions> = [
    [
      'screen and (min-width: 640px)',
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: value => value
      }
    ],
    [
      'screen and (min-width: 1024px)',
      {
        labelOffset: 80,
        chartPadding: 20
      }
    ]
  ];

  ngOnInit(): void {
    this.userService.getAllTurns().then(res => {
      this.turnRes = res;
      this.turnAll = [...this.turnRes];
      this.turnAll.forEach(turn => this.dates.push(turn.specialty));
      const result = this.dates.reduce((json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }), {});
      let daysWeek = Object.keys(result);
      this.data.labels = [];
      daysWeek.forEach(res => {
        this.data.labels.push(res);
      })
      console.log(this.data.labels);
      this.data.series = Object.values(result);
      console.log(this.data.series);
      new PieChart('#chart4', this.data, this.options, this.responsiveOptions);

    })
  }
  downloadData() {
    var imgData;
    html2canvas(document.getElementById('chart4')!).then(function (canvas) {
      imgData = canvas.toDataURL('image');
      let doc = new jsPDF('p', 'mm', 'a4',);
      doc.addImage('../../assets/icon.png', 'PNG', 10, 10, 25, 23);
      const date = new Date().toLocaleString();
      doc.text(`Clínica Online`, 70, 20);
      doc.text(`${date}`, 150, 10);
      doc.text(`Turnos por especialidad`, 70, 30);
      doc.addImage(imgData, 'PNG', -50, 50, 300, 200);
      doc.save('turnos-especialidad.pdf');
    });
  }
}

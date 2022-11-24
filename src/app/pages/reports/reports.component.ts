import { Component, OnInit } from '@angular/core';
import { Turns } from 'src/app/entities/turns';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

import { BarChart, LineChart, LineChartData, LineChartOptions, PieChart, PieChartOptions, ResponsiveOptions } from 'chartist';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(public auth: AuthService,
    public userService: UsersService) { }

  chart: any = [];
  days: string[] = [];

  data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
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



  turnsAll: Turns[] = [];
  turnsAllAny: any;

  ngOnInit(): void {
    new PieChart('#chart4', this.data, this.options, this.responsiveOptions);
    this.userService.getAllFinallyTurns().then(res => {
      this.turnsAllAny = res;
      this.turnsAll = [...this.turnsAllAny];
      const result = this.turnsAllAny.reduce((json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }), {});
      console.log(Object.keys(result));
      console.log(Object.values(result));
      //this.data.labels = Object.keys(result);
      //this.data.series.push(Object.values(result));
    })
  }





  /*
  loadBySpecialistFinished() {
    if (!this.from || !this.to) return;
    this.result = [];
    const specialit = this.turnsAll.reduce(
      (r: any, a: any) => {
        const date = new Date(a.creationDate.seconds * 1000);
        if (
          a.status === 'Terminado' &&
          date > new Date(this.from) &&
          date < new Date(this.to)
        ) {
          this.result.push(a);
          r[a.specialistName] = r[a.specialistName] || [];
          r[a.specialistName].push(a);
        }
        return r;
      },
      Object.create(null)
    );
    let labels: any = [];
    let series: any = [[], []];
    Object.keys(specialit).map((key, index) => {
      labels.push(key);
      series[0].push(specialit[key].length);
      // series[1].push(specialit[key].length);
    });
    const data = {
      labels,
      series,
    };
    this.data = data;
    this.options = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70,
      },
    };
    this.events = {
      draw: (data: any) => {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px',
          });
          // data.element.animate({
          //   y2: <IChartistAnimationOptions>{
          //     dur: '1s',
          //     from: data.y1,
          //     to: data.y2,
          //     easing: 'easeOutQuad',
          //   },
          // });
        }
      },
    };
  }*/

}

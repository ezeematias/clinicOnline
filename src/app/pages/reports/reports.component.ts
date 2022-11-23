import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

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

  ngOnInit(): void {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'red',
            'red',
            'red',
            'red',
            'red',
            'red',
            'red',
          ],
        },
        {
          data: [2, 9, 1, 1, 2, 2],
          backgroundColor: [
            '#00ffff',
            '#00ffff',
            '#00ffff',
            '#00ffff',
            '#00ffff',
            '#00ffff',
            '#00ffff',
          ],
        }
        ]
      }, options: {
        scales: {
          x: { display: true },
          y: {
            display: true,
            beginAtZero: true
          }
        }
      }
    })
  }




}

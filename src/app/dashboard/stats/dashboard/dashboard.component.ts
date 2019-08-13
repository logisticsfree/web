import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TripsService } from '../services/trips.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          steps: 10,
          stepValue: 10,
          min: 0,
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#ffdd57',
      borderColor: 'lightblue',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];

  constructor(private tripService: TripsService) { }

  currentTrips = 0;

  ngOnInit() {
    this.drawTripsGraph();
    this.tripService.getCurrentTrips().subscribe(res => {
      this.currentTrips = res.length;
    });
  }

  drawTripsGraph() {
    this.tripService.getCompletedTrips().subscribe(res => {
      this.lineChartData = [];
      this.lineChartLabels = [];
      const data = [];

      Object.keys(res).sort().forEach(key => {
        data.push(res[key]);
        this.lineChartLabels.push(key);
      });
      this.lineChartData.push({
        data,
        label: '# of trips'
      })
    });
  }
}

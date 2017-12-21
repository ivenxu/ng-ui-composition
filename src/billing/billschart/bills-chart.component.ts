import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'bills-chart-selector',
    template: `
      <ngx-charts-bar-vertical
        [view]="view"
        [scheme]="colorScheme"
        [results]="single"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel"
        (select)="onSelect($event)">
      </ngx-charts-bar-vertical>
    `
  })
  export class BillsChartComponent {
    single = [
        {
          "name": "Germany",
          "value": 8940000
        },
        {
          "name": "USA",
          "value": 5000000
        },
        {
          "name": "France",
          "value": 7200000
        }
      ];;
    multi: any[];
  
    view: any[] = [700, 400];
  
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
  
    constructor() {
    }
    
    onSelect(event) {
      console.log(event);
    }
  }
  
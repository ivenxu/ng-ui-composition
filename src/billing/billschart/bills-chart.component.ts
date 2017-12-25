import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BillingService, Bill } from '../service/billing-service';

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
        [barPadding]="barPadding"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel"
        (select)="onSelect($event)">
      </ngx-charts-bar-vertical>
    `
  })
  export class BillsChartComponent implements OnInit {
    constructor(private billingService: BillingService) {}

    single = [
        {
          "name": "Germany",
          "value": 8940000,
          "id": 1234
        },
        {
          "name": "USA",
          "value": 5000000,
          "id": 2233
        },
        {
          "name": "France",
          "value": 7200000,
          "id": 3333
        }
      ];;
    multi: any[];
  
    view: any[] = [700, 400];
  
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    barPadding = 60;
    bills: Bill[];
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    ngOnInit() {
      this.getBills();
    }

    getBills() {
      this.billingService.getRecentBills(123, 'Gas').subscribe(bills=>{
        console.log(bills);
        this.bills = bills;
      });
    }
    
    onSelect(event) {
      console.log(event);
    }
  }
  
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BillingService, Bill, BillStatus } from '../service/billing-service';

@Component({
    selector: 'bills-chart-selector',
    template: `
      <ngx-charts-bar-vertical
        [view]="view"
        [scheme]="chartModel.colorScheme"
        [results]="chartModel.data"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [barPadding]="barPadding"
        (select)="onSelect($event)">
      </ngx-charts-bar-vertical>
    `
  })
  export class BillsChartComponent implements OnInit {
    constructor(private billingService: BillingService) {}

    chartModel: any;
  
    view: any[] = [700, 400];
  
    // options
    showXAxis = true;
    showYAxis = true;
    barPadding = 16;
    bills: Bill[];
  

    ngOnInit() {
      this.getBills();
    }

    getBills() {
      this.billingService.getRecentBills(123, 'Gas').subscribe(bills=>{
        console.log(bills);
        let chartModel = { data:[], colorScheme: { domain:[]} };
        for(let bill of bills) {
          chartModel.data.push({
            name: this.formatDate(bill.issueDate),
            value: bill.dueAmount
          });
          chartModel.colorScheme.domain.push(this.colorizeStatus(bill.status));
        }
        this.chartModel = chartModel;
      });
    }
    
    onSelect(event) {
      console.log(event);
    }

    colorizeStatus(status: BillStatus): string {
      switch(status) {
        case BillStatus.Overdue:
          return '#A52A2A';
        case BillStatus.Dispute:
          return '#f0ad4e';
        default:
          return '#008000';
      }
    }

    formatDate(date: Date): string{
      let now = new Date();
      const auLocale = 'en-au';
      let shortMonth = date.toLocaleString(auLocale, { month: 'short'});
      if (now.getFullYear() == date.getFullYear()) {
        return shortMonth;
      } else {
        return shortMonth + '-' + date.toLocaleString(auLocale, {year:'2-digit'});
      }
    }
  }
  
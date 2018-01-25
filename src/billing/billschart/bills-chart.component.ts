import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BillingService, Bill, BillStatus, BillingContext } from '../service/billing-service';
import { CustomerContext } from '../../share/service/customer-context.service';

@Component({
    selector: 'bills-chart-selector',
    template: `
      <div [style.height]="height + 'px'">
        <ngx-charts-bar-vertical
          [scheme]="chartModel.colorScheme"
          [results]="chartModel.data"
          [xAxis]="showXAxis"
          [yAxis]="showYAxis"
          [barPadding]="barPadding"
          (select)="onSelect($event)">
        </ngx-charts-bar-vertical>
      </div>
    `
  })
  export class BillsChartComponent implements OnInit {
    constructor(private billingService: BillingService, private billingContext: BillingContext, private customerContext: CustomerContext) {}

    chartModel = { data:[], colorScheme: { domain:[]} };
    
    billMap = {};
  
    // options
    showXAxis = true;
    showYAxis = true;
    barPadding = 16;
    bills: Bill[];
    @Input()
    height: number;
  

    ngOnInit() {
      this.customerContext.currentAccountIdSubject.subscribe(acctId => {
        this.getBills(acctId);
      });
    }

    private getBills(accountId: number) {
      this.billingService.getRecentBills(accountId).subscribe(bills=>{

        let chartModel = { data:[], colorScheme: { domain:[]} };
        for(let bill of bills) {
          let summary = {
            name: this.formatDate(bill.issueDate),
            value: bill.dueAmount
          };
          chartModel.data.push(summary);
          this.billMap[this.toKey(summary)] = bill;
          chartModel.colorScheme.domain.push(this.colorizeStatus(bill.status));
        }
        this.chartModel = chartModel;
      });
    }
    
    onSelect(event) {
      console.log(event);
      let selectedBill = this.billMap[this.toKey(event)];
      if (selectedBill) {
        this.billingContext.selectBill(selectedBill);
      }
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

    private toKey(summary: any): string{
      return summary.name + "-$" + summary.value;
    }
  }
  
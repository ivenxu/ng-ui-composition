import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerSummaryComponent } from './customersummary/costomer-summary.component';
import { BillingModule } from '../billing/billing.module';
import { ShareModule } from '../share/share.module';


@NgModule({
    imports: [ 
      CommonModule,
      BrowserModule,
      BillingModule,
      ShareModule],
    declarations: [ DashboardComponent, CustomerSummaryComponent ],
    exports: [ DashboardComponent, CustomerSummaryComponent ],
    providers: [ ],
    bootstrap: [ DashboardComponent, CustomerSummaryComponent ]
  })
export class CareModule {}
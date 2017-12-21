import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerSummaryComponent } from './customersummary/customer-summary.component';
import { BillingModule } from '../billing/billing.module';
import { ShareModule } from '../share/share.module';
import { CareAppComponent } from './app/care-app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [ 
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      NgxChartsModule,
      BillingModule,
      ShareModule],
    declarations: [  CareAppComponent, DashboardComponent, CustomerSummaryComponent  ],
    exports: [ CareAppComponent, DashboardComponent, CustomerSummaryComponent ],
    providers: [ ],
    bootstrap: [ CareAppComponent ]
  })
export class CareModule {}
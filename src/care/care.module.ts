import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerSummaryComponent } from './customersummary/customer-summary.component';
import { BillingModule } from '../billing/billing.module';
import { ShareModule } from '../share/share.module';
import { CareAppComponent } from './app/care-app.component';
import { TopBarComponent } from './topbar/top-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CustomerService, CustomerLocator} from './service/customer.service';
import { CustomerContext } from '../share/service/customer-context.service';
import { AccountSummaryComponent } from './accountsummary/account-summary.component';
import { ContactSummary } from './contactsummary/contact-summary.component';
import { NotificationSummary } from './notificatonsummary/notification-summary.component';


@NgModule({
    imports: [ 
      CommonModule,
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      NgxChartsModule,
      BillingModule,
      ShareModule],
    declarations: [  CareAppComponent, DashboardComponent, CustomerSummaryComponent, TopBarComponent, AccountSummaryComponent, ContactSummary, NotificationSummary ],
    exports: [ CareAppComponent, DashboardComponent, CustomerSummaryComponent, TopBarComponent, AccountSummaryComponent, ContactSummary, NotificationSummary ],
    providers: [ CustomerContext, CustomerLocator, CustomerService ],
    bootstrap: [ CareAppComponent ]
  })
export class CareModule {}
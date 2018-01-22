import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { CustomerUsageComponent } from './customerusage/customer-usage.component';
import { CareBillingComponent } from './care-billing-dash/care-billing-dash.component';
import { BillsChartComponent } from './billschart/bills-chart.component';
import { BillingService, BillingContext } from './service/billing-service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BillDetailComponent } from './billdetail/bill-detail.component';
import { ShareModule } from '../share/share.module';


@NgModule({
    imports: [ 
      CommonModule,
      NgxChartsModule,
      ShareModule 
    ],
    declarations: [ 
      CustomerUsageComponent, 
      CareBillingComponent, 
      BillsChartComponent,
      BillDetailComponent ],
    exports:      [ 
      CustomerUsageComponent, 
      CareBillingComponent, 
      BillsChartComponent,
      BillDetailComponent ],
    providers: [ BillingService, BillingContext ]
  })
export class BillingModule {}
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { CustomerUsageComponent } from './customerusage/customer-usage.component';
import { CareBillingComponent } from './care-billing-dash/care-billing-dash.component';
import { BillsChartComponent } from './billschart/bills-chart.component';
import { BillingService } from './service/billing-service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [ 
      CommonModule,
      NgxChartsModule 
    ],
    declarations: [ 
      CustomerUsageComponent, 
      CareBillingComponent, 
      BillsChartComponent ],
    exports:      [ 
      CustomerUsageComponent, 
      CareBillingComponent, 
      BillsChartComponent ],
    providers: [ BillingService ]
  })
export class BillingModule {}
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { CustomerUsageComponent } from './customerusage/customer-usage.component';


@NgModule({
    imports:      [ CommonModule ],
    declarations: [ CustomerUsageComponent ],
    exports:      [ CustomerUsageComponent ],
    providers:    [ ]
  })
export class BillingModule {}
import { Component, OnInit }      from '@angular/core';
import { SupplyAccount, CustomerService } from '../service/customer.service';
import { CustomerContext } from '../../share/service/customer-context.service';

@Component({
    selector: 'dashboard-selector',
    templateUrl: 'care/dashboard/dashboard.component.html'
  })
  export class DashboardComponent implements OnInit {
    accounts: SupplyAccount[];

    constructor(private customerContext: CustomerContext, private customerService: CustomerService) {}

    ngOnInit(): void {
      this.customerContext.currentCustomerId.subscribe(custId => {
        this.customerService.principleAccountsByCustomerId(custId).subscribe(accts =>{
          this.accounts = accts;
        });
      });
    }
  }
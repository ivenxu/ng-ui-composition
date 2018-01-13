import { Component, OnInit }      from '@angular/core';
import { Customer, CustomerService } from '../service/customer.service';
import { CustomerContext } from '../../share/service/customer-context.service';


@Component({
    selector: 'customer-summary-selector',
    templateUrl: 'care/customersummary/customer-summary.component.html'
  })
  export class CustomerSummaryComponent implements OnInit {
    customer: Customer;
    constructor(private customerContext: CustomerContext, private customerService: CustomerService) {}

    ngOnInit(): void {
      this.customerContext.currentCustomerIdSubject.subscribe(customerId =>{
        this.customerService.customerById(customerId).subscribe(customer =>{this.customer=customer});
      });
    }
  }
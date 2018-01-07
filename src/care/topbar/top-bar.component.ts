import { Component }      from '@angular/core';
import { CustomerLocator } from '../service/customer.service';

@Component({
    selector: 'top-bar-selector',
    templateUrl: 'care/topbar/top-bar.component.html'
  })
  export class TopBarComponent {
    queryCustomerId = ""; 

    constructor(private customerLocator: CustomerLocator){}

    searchCustomer() {
      console.log('Searching customer by: ' + this.queryCustomerId);
      this.customerLocator.locateCustomer(+this.queryCustomerId);
    }
  }
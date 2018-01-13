import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


@Injectable() 
export class CustomerContext {

    currentCustomerIdSubject = new Subject<number>();
    currentAccountIdSubject = new Subject<number>();
    currentCustomerId: number;
    currentAccountId: number;

    setCurrentCustomerId(customerId: number) {
        if (customerId  != this.currentCustomerId) {
            this.currentCustomerId = customerId;
            this.currentCustomerIdSubject.next(customerId);
        }
    }

    setCurrentAccountId(accountId: number) {
        if (accountId != this.currentAccountId) {
            this.currentAccountId = accountId;
            this.currentAccountIdSubject.next(accountId);
        }
    }
}
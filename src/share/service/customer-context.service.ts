import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


@Injectable() 
export class CustomerContext {

    currentCustomerId = new Subject<number>();
    currentAccountId = new Subject<number>();

    setCurrentCustomerId(customerId: number) {
        this.currentCustomerId.next(customerId);
    }

    setCurrentAccountId(accountId: number) {
        this.currentAccountId.next(accountId);
    }
}
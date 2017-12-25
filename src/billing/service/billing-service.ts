
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BillingService {

    constructor() { }

    getRecentBills(accountId: number, fuel: string): Observable<Bill[]> {
        const billNumber = 12;
        const minBillAmount = 50;
        const maxBillAmount = 300;
        let bills = [];
        let lastIssueDate = this.lastDayofPreviousMonth();
        for (let i = 0; i < billNumber; i++) {
            const bill: Bill = {
                id: this.randomIntBetween(accountId, accountId + 1000),
                dueAmount: this.randomBetween(minBillAmount, maxBillAmount),
                issueDate: lastIssueDate,
                dueDate: this.calulateDueDate(lastIssueDate),
                status: BillStatus[BillStatus[this.randomIntBetween(0,3)]],
                fuel: FuelType[fuel]
            };
            bills.unshift(bill);
            lastIssueDate = this.lastMonthIssueDate(lastIssueDate);
        }
        return of(bills);
    }

    lastDayofPreviousMonth(): Date {
        let d = new Date();
        d.setDate(0);
        return d;
    }

    lastMonthIssueDate(current: Date): Date {
        let d = new Date(current);
        d.setMonth(current.getMonth() - 1);
        return d;
    }

    calulateDueDate(issueDate: Date): Date {
        const dueDays = 15;
        let d = new Date(issueDate);
        d.setDate(issueDate.getDate() + dueDays);
        return d;
    }

    randomBetween(min: number, max: number): number {
        return Math.random()*(max-min+1)+min;
    }

    randomIntBetween(min: number, max: number): number {
        return Math.floor(this.randomBetween(min, max));
    }
}

export enum FuelType {
    Electricity,
    Gas
}

export enum BillStatus {
    New,
    Paid,
    Dispute,
    Overdue
}

export class Bill {
    id: number;
    dueDate: Date;
    issueDate: Date;
    fuel: FuelType;
    dueAmount: number;
    status: BillStatus;
}
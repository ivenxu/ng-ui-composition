
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BillingService {

    constructor() { }

    getRecentBills(accountId: number): Observable<Bill[]> {
        const billNumber = 12;
        const minBillAmount = 50;
        const maxBillAmount = 300;
        let bills = [];
        let lastIssueDate = this.lastDayofPreviousMonth();
        let account = this.getAccount(accountId);
        for (let i = 0; i < billNumber; i++) {
            const bill: Bill = {
                id: this.randomIntBetween(accountId, accountId + 1000),
                dueAmount: parseFloat(this.randomBetween(minBillAmount, maxBillAmount).toFixed(2)),
                issueDate: lastIssueDate,
                dueDate: this.calulateDueDate(lastIssueDate),
                status: BillStatus[BillStatus[this.randomIntBetween(0,3)]],
                fuel: account.fuel
            };
            bills.unshift(bill);
            lastIssueDate = this.lastMonthIssueDate(lastIssueDate);
        }
        return of(bills);
    }

    getAccount(accountId: number): SupplyAccount {
        return {
            id: accountId,
            fuel: FuelType.Gas
        };
    }

    private lastDayofPreviousMonth(): Date {
        let d = new Date();
        d.setDate(0);
        return d;
    }

    private lastMonthIssueDate(current: Date): Date {
        let d = new Date(current);
        d.setDate(0);
        return d;
    }

    private calulateDueDate(issueDate: Date): Date {
        const dueDays = 15;
        let d = new Date(issueDate);
        d.setDate(issueDate.getDate() + dueDays);
        return d;
    }

    private randomBetween(min: number, max: number): number {
        return Math.random()*(max-min+1)+min;
    }

    private randomIntBetween(min: number, max: number): number {
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

export class SupplyAccount {
    id: number;
    fuel: FuelType;
}
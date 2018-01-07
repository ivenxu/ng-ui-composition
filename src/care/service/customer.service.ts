import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { CustomerContext } from '../../share/service/customer-context.service';


@Injectable()
export class CustomerLocator {
    constructor(private customerContext: CustomerContext){}
    locateCustomer(id: number) {
        if (Number.isNaN(id)) {
            throw new NotFound("Customer Id: " + id + " not exists.");
        }
        this.customerContext.setCurrentCustomerId(id);
    }
}

@Injectable()
export class CustomerService {

    customerById(id: number): Observable<Customer> {
        let customer: Customer = {
            id: id,
            fullName: mockNames[this.randomIntBetween(0, mockNames.length-1)],
            address: this.generateAddress(),
            electricityEnabled: electricityEnabled(id),
            gasEnabled: gasEnabled(id)
        };
        return of(customer);
    }

    principleAccountsByCustomerId(customerId: number): Observable<SupplyAccount[]> {
        let nextBillDate = new Date();
        nextBillDate.setDate(nextBillDate.getDate() + 10);
        let electricityAccount: SupplyAccount = {
            id: customerId + 100,
            customerId: customerId,
            status: AccountStatus[AccountStatus[this.randomIntBetween(0, 3)]],
            amountDue: parseFloat(this.randomBetween(-300, 300).toFixed(2)),
            fuelType: FuelType.Electricity,
            enabled: electricityEnabled(customerId),
            nextBillDate: nextBillDate,
            lifeSupport: (1 == this.randomIntBetween(0, 5)),
        };
        let gasAccount: SupplyAccount = {
            id: customerId + 200,
            customerId: customerId,
            status: AccountStatus[AccountStatus[this.randomIntBetween(0, 3)]],
            amountDue: parseFloat(this.randomBetween(-300, 300).toFixed(2)),
            fuelType: FuelType.Gas,
            enabled: gasEnabled(customerId),
            nextBillDate: nextBillDate,
            lifeSupport: (1 == this.randomIntBetween(0, 5)),
        };
        let accounts: SupplyAccount[] = [
            electricityAccount, gasAccount
        ];

        return of(accounts);
    }

    private generateAddress(): string {
        let propertyNumber = this.randomIntBetween(1, 100);
        let street = mockStreetNames[this.randomIntBetween(0, mockStreetNames.length-1)];
        let streetType = mockStreetTypes[this.randomIntBetween(0, mockStreetTypes.length-1)];
        let suburb = mockSuburbs[this.randomIntBetween(0, mockSuburbs.length -1)];
        let state = mockStates[this.randomIntBetween(0, mockStates.length-1)];
        let post = this.randomIntBetween(1000, 5999);

        return propertyNumber + " " + street + " " + streetType + " " + suburb + ", " + state + " " + post;
    }

    private randomBetween(min: number, max: number): number {
        return Math.random()*(max-min+1)+min;
    }

    private randomIntBetween(min: number, max: number): number {
        return Math.floor(this.randomBetween(min, max));
    }
}

export class NotFound extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export interface Customer {
    id: number;
    fullName: string;
    address: string;
    electricityEnabled: boolean;
    gasEnabled: boolean;
}

export enum AccountStatus {
    Transfering,
    Billing,
    Lost,
    Suspended,
    Cancelled
}

export enum FuelType {
    Electricity,
    Gas
}

export interface SupplyAccount {
    id: number;
    customerId: number;
    status: AccountStatus;
    amountDue: number;
    nextBillDate: Date;
    fuelType: FuelType;
    enabled: boolean;
    lifeSupport: boolean;
}


function electricityEnabled(customerId: number): boolean {
    return (0 == customerId % 5) || (2==customerId % 5) || (3==customerId % 5);
}

function gasEnabled(customerId: number): boolean {
    return (1 == customerId % 5) || (2==customerId % 5) || (3==customerId % 5);
}

const mockStreetNames = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune','Pluto'];

const mockStreetTypes = ['Ave', 'Dr', 'St'];

const mockStates =['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'NT', 'ACT'];

const mockNames = ['Brian Abbot', 'Deniz Akdeniz', 'Danny Alder', 'Bert Bailey', 'Helmut Bakaitis',
    'Dallas Cairns', 'Jack Cannot', 'Paul Capsis', 'Joel Edgerton', 'Kelley Abbey', 'Olga Agnew', 
    'Penny Cook', 'Nicole da Silva', 'Elspeth Ballantyne', 'Judi Farr', 'Zoe Caldwell'];

const mockSuburbs = ['Airds', 'Busby', 'Cabarita', 'Doncaster', 'Galston'];
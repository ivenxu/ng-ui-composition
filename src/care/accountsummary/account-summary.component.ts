import { Component, Input, OnInit } from '@angular/core';
import { SupplyAccount, AccountStatus, FuelType } from '../service/customer.service';
import { CustomerContext } from '../../share/service/customer-context.service';

@Component({
    selector: 'account-summary-selector',
    template: ` 
    <div class="panel" [ngClass]="boxClasses">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-2">
                    <span class="fuel-bg-cycle"><i class="fa fa-4x" [ngClass]="fuelTypeClasses"></i></span>
                </div>
                <div class="col-xs-2">
                    <div><span>Status: </span><span style="font-weight: bold;">{{AccountStatus[account.status]}}</span></div>
                    <span [style.visibility]="account.lifeSupport ? 'visible' : 'hidden'">
                        <i class="fa fa-life-ring"></i>
                    </span>
                </div>
                <div class="col-xs-2">
                    <div><span>Next Bill: </span><span style="font-weight: bold;">{{account.nextBillDate | dtformat}}</span></div>
                </div>
                <div class="col-xs-6 text-right">
                    <div class="huge">{{account.amountDue}}</div>
                    <div>{{account.amountDue <= 0 ? 'credits' : 'amount due'}}</div>
                </div>
            </div>
        </div>
        <a href="#" (click)="select();false">
            <div class="panel-footer">
                <span class="pull-left">View Details</span>
                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                <div class="clearfix"></div>
            </div>
        </a>
    </div>`,
    styles: [
        `.selected {
            outline-style: groove;
            outline-color: firebrick;
        }`,
        `.elec-icon {
            color: Aqua;
        }`,
        `.gas-icon {
            color: Coral;
        }`,
        `.disabled-icon {
            color: gray;
        }`,
        `.fuel-bg-cycle {
            padding: 0.1em;
            width: 4.8em;
            height: 4.8em;
            -moz-border-radius: 2.5em;
            -webkit-border-radius: 2.5em;
            border-radius: 2.5em;
            background-color: white;
            display: block;
            text-align: center;
        }`
    ]
  })
  export class AccountSummaryComponent implements OnInit {
    _account: SupplyAccount;
    _selected: boolean;
    boxClasses: {};
    fuelTypeClasses: {};
    AccountStatus = AccountStatus;
    constructor(private customerContext: CustomerContext) {}

    ngOnInit(): void {
        this.reapplyClasses();
    }

    @Input()
    set account(account: SupplyAccount){
        this._account = account;
        this.reapplyClasses();
    }

    get account(): SupplyAccount {
        return this._account
    }

    @Input() 
    set selected(selected: boolean) {
        this._selected = selected;
        this.reapplyClasses();
    }

    get selected(): boolean {
        return this._selected;
    }

    select(): void {
        this.customerContext.setCurrentAccountId(this.account.id);
    }
    
    private calcBoxClasses(): void {
        this.boxClasses = {
            'selected': this.selected,
            'panel-primary': AccountStatus.Transfering == this.account.status,
            'panel-green': AccountStatus.Billing == this.account.status,
            'panel-yellow': AccountStatus.Suspended == this.account.status,
            'panel-red': (AccountStatus.Cancelled == this.account.status 
                || AccountStatus.Lost == this.account.status)
        };
    }

    private reapplyClasses(): void {
        this.calcBoxClasses();
        this.calcFuelTypeClasses();
    }

    private calcFuelTypeClasses(): void {
        this.fuelTypeClasses = {
            'fa-bolt': FuelType.Electricity == this.account.fuelType,
            'fa-fire': FuelType.Gas == this.account.fuelType,
            'elec-icon': (this.account.enabled && FuelType.Electricity == this.account.fuelType),
            'gas-icon': (this.account.enabled && FuelType.Gas == this.account.fuelType),
            'disabled-icon': !this.account.enabled
        };
    }
  }
import { Component, OnInit }      from '@angular/core';
import { Bill, FuelType, BillStatus, BillingService, BillingContext } from '../service/billing-service';


@Component({
    selector: 'bill-detail-selector',
    template: 
    `<div class="panel panel-default" *ngIf="bill">
        <div class="panel-heading">
            <i class="fa fa-file-text-o fa-fw"></i> Bill Detail
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Id</label>
                    <span>{{bill.id}}</span>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Amount Due</label>
                    <span>{{bill.dueAmount}}</span>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Issue date</label>
                    <span>{{bill.issueDate | dtformat}}</span>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Due date</label>
                    <span>{{bill.dueDate | dtformat}}</span>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Fuel type</label>
                    <span>{{FuelType[bill.fuel]}}</span>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label class="col-xs-12 no-padding">Status</label>
                    <span>{{BillStatus[bill.status]}}</span>
                </div>
            </div>
        </div>
    </div>`, 
    styles: [
        `label.no-padding {
            padding-left: 0px;
            padding-right: 0px;
        }`
    ]
  })
  export class BillDetailComponent implements OnInit {
    bill: Bill;
    FuelType = FuelType;
    BillStatus = BillStatus;
    constructor(private billingService: BillingService, private billingContext: BillingContext){}

    ngOnInit(): void {
        this.billingContext.selectedBillSubject.subscribe(bill => {
            this.bill = bill;
        })
    }
  }
import { Component, OnInit } from "@angular/core";
import { CustomerContext } from "../../share/service/customer-context.service";
import { CustomerService, Contact, ContactType, CommunicateType } from "../service/customer.service";


@Component({
    selector: 'contact-summary-selector',
    template: 
    `<div class="panel panel-primary" *ngIf="contactsYTD && !detailMode">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-3">
                    <i class="fa fa-comments fa-5x"></i>
                </div>
                <div class="col-xs-9 text-right">
                    <div class="huge">{{contactsYTD?.length}}</div>
                    <div>Contacts</div>
                </div>
            </div>
        </div>
        <a href="#" (click)="toggleViewMode();false">
            <div class="panel-footer">
                <span class="pull-left">View Details</span>
                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                <div class="clearfix"></div>
            </div>
        </a>
    </div>
    <div class="panel panel-default" *ngIf="contactsYTD && detailMode">
        <div class="panel-heading">
            <i class="fa fa-comments fa-fw"></i> Contacts
            <a href="#" (click)="toggleViewMode();false" class="pull-right"><i class="fa fa-arrow-circle-left"></i> Back</a>
        </div>
        <div class="panel-body">
            <ul class="chat">
                <li class="clearfix" [class.left]="contact.type==ContactType.InBound" 
                    [class.right]="contact.type==ContactType.OutBound" *ngFor="let contact of contactsYTD">
                <span class="avatar-cycle" [class.pull-right]="contact.type==ContactType.OutBound"
                    [class.pull-left]="contact.type==ContactType.InBound"
                    [class.green-bg]="contact.type==ContactType.InBound" [class.orange-bg]="contact.type==ContactType.OutBound">
                    <span class="avator-font">{{contact.contactName | nmInit}}</span>
                </span>
                <div class="chat-body clearfix">
                    <div class="head">
                        <small class="text-muted" [class.pull-right]="contact.type==ContactType.InBound">
                        <i class="fa fa-clock-o fa-fw"></i>{{contact.date | dtformat}}</small>
                        <strong class="primary-font" [class.pull-right]="contact.type==ContactType.OutBound">{{contact.contactName}}</strong>
                    </div>
                    <p>
                        <i class="communicate-type-color" [class.fa-phone]="contact.communicateType==CommunicateType.Phone" 
                            [class.fa-at]="contact.communicateType==CommunicateType.Email"    
                            [class.fa-comment-o]="contact.communicateType==CommunicateType.OnlineChat" class="fa "></i>
                        {{contact.description}}
                    </p>
                </div>
                </li>
            </ul>
        </div>
    </div>
    `,
    styles: [
        `.avatar-cycle {
            padding: 0.05em;
            width: 3.2em;
            height: 3.2em;
            -moz-border-radius: 1.6em;
            -webkit-border-radius: 1.6em;
            border-radius: 1.6em;
            display: inline-block;
            text-align: center;
        }`,
        `.avator-font {
            color: white;
            font-size: 2.1em;
        }`,
        `.green-bg {
            background-color: #339e35
        }`,
        `.orange-bg {
            background-color: #d11600
        }`,
        `.communicate-type-color {
            color: orange;
        }`
    ]
})
export class ContactSummary implements OnInit {
    detailMode = false;
    contactsYTD: Contact[];
    ContactType = ContactType;
    CommunicateType = CommunicateType;
    constructor(private customerContext: CustomerContext, private customerService: CustomerService) {}
    ngOnInit(): void {
        this.customerContext.currentCustomerIdSubject.subscribe(customerId => {
            this.customerService.contactsYTD(customerId).subscribe(contacts =>{
                this.contactsYTD = contacts;
            });
        });
    }

    toggleViewMode():void {
        this.detailMode = !this.detailMode;
    }


}
import { Component, OnInit } from "@angular/core";
import { CustomerContext } from "../../share/service/customer-context.service";
import { CustomerService, Notification, NotificationType } from "../service/customer.service";


@Component({
    selector: 'notification-summary-selector',
    template: 
    `<div class="panel panel-red" *ngIf="notificationsYTD && !detailMode">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-3">
                    <i class="fa fa-bell fa-5x"></i>
                </div>
                <div class="col-xs-9 text-right">
                    <div class="huge">{{notificationsYTD?.length}}</div>
                    <div>Notifications</div>
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
    <div class="panel panel-default" *ngIf="notificationsYTD && detailMode">
        <div class="panel-heading">
            <i class="fa fa-bell fa-fw"></i> Notifications
            <a href="#" (click)="toggleViewMode();false" class="pull-right"><i class="fa fa-arrow-circle-left"></i> Back</a>
        </div>
        <div class="panel-body">
                <div class="list-group">
                <a href="#" class="list-group-item" *ngFor="let notification of notificationsYTD">
                    <i class="fa fa-fw" [class.fa-power-off]="notification.type==NotificationType.Outage"
                        [class.fa-bullhorn]="notification.type==NotificationType.Broadcast"
                        [class.fa-snowflake-o]="notification.type==NotificationType.BadWeather"
                        [class.fa-user-secret]="notification.type==NotificationType.Supervisor"></i> {{notification.content}}
                    <span class="pull-right text-muted small"><em>{{notification.date | dtformat}}</em>
                    </span>
                </a>
            </div>
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
export class NotificationSummary implements OnInit {
    detailMode = false;
    notificationsYTD: Notification[];
    NotificationType = NotificationType;
    constructor(private customerContext: CustomerContext, private customerService: CustomerService) {}
    ngOnInit(): void {
        this.customerContext.currentCustomerIdSubject.subscribe(customerId => {
            this.customerService.notificationsYTD(customerId).subscribe(notificatons =>{
                this.notificationsYTD = notificatons;
            });
        });
    }

    toggleViewMode():void {
        this.detailMode = !this.detailMode;
    }


}
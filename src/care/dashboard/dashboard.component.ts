import { Component, OnInit }      from '@angular/core';
import { SupplyAccount, CustomerService } from '../service/customer.service';
import { CustomerContext } from '../../share/service/customer-context.service';

@Component({
    selector: 'dashboard-selector',
    templateUrl: 'care/dashboard/dashboard.component.html'
  })
  export class DashboardComponent implements OnInit {
    accounts: SupplyAccount[];
    selectedAccount: SupplyAccount;

    constructor(private customerContext: CustomerContext, private customerService: CustomerService) {}

    ngOnInit(): void {
      this.customerContext.currentCustomerIdSubject.subscribe(custId => {
        this.customerService.principleAccountsByCustomerId(custId).subscribe(accts =>{
          this.accounts = accts;
          this.selectDefaultAccount(this.accounts);
        });
      });

      this.customerContext.currentAccountIdSubject.subscribe(acctId => {
        this.selectedAccount = this.locateAccount(acctId);
      });
    }

    private defaultSelectedAccount(accounts: SupplyAccount[]): SupplyAccount {
      if (accounts && accounts.length == 2) {
        let elecAcct = accounts[0];
        let gasAcct = accounts[1];
        return (elecAcct.enabled || (!elecAcct.enabled && !gasAcct.enabled)) ? elecAcct : gasAcct;
      } else {
        return null;
      }
    }

    private selectDefaultAccount(accounts: SupplyAccount[]): void {
      let selectedAccount = this.defaultSelectedAccount(accounts);
      if (selectedAccount) {
        this.customerContext.setCurrentAccountId(selectedAccount.id);
      }
    }

    private locateAccount(acctId: number): SupplyAccount {
      if (this.accounts) {
        for (var account of this.accounts) {
          if (account.id == acctId) {
            return account;
          }
        }
      } else {
        return null;
      }
    }
  }
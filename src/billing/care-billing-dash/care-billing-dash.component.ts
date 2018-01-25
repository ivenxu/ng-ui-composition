import { Component }      from '@angular/core';

@Component({
    selector: 'care-billing-dash-selector',
    template: 
    `
    <div class="row" style="min-height: 400px;">
      <div class="col-xs-12 col-md-8">
        <bills-chart-selector height="400"></bills-chart-selector>
      </div>
      <div class="col-xs-12 col-md-4">
        <bill-detail-selector></bill-detail-selector>
      </div>
    </div>`
  })
  export class CareBillingComponent {
    title = 'care billing component';
  }
import { Component }      from '@angular/core';

@Component({
    selector: 'care-billing-dash-selector',
    template: `<bills-chart-selector></bills-chart-selector>`
  })
  export class CareBillingComponent {
    title = 'care billing component';
  }
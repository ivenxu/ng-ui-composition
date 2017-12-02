import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CareModule } from './care/care.module';


platformBrowserDynamic().bootstrapModule(CareModule)
  .catch(err => console.log(err));

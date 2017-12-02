import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { SidemenuComponent } from './sidemenu/side-menu.component';


@NgModule({
    imports:      [ CommonModule ],
    declarations: [ SidemenuComponent ],
    exports:      [ SidemenuComponent ],
    providers:    [ ]
  })
export class ShareModule {}
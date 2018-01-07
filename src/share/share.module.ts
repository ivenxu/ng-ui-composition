import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { SidemenuComponent } from './sidemenu/side-menu.component';
import { DateFormatPipe } from './pipe/format-date.pipe';


@NgModule({
    imports:      [ CommonModule ],
    declarations: [ SidemenuComponent, DateFormatPipe ],
    exports:      [ SidemenuComponent, DateFormatPipe ],
    providers:    [ ]
  })
export class ShareModule {}
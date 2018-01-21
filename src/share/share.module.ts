import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { SidemenuComponent } from './sidemenu/side-menu.component';
import { DateFormatPipe } from './pipe/format-date.pipe';
import { NameInitialsPipe } from './pipe/name-format.pipe';


@NgModule({
    imports:      [ CommonModule ],
    declarations: [ SidemenuComponent, DateFormatPipe, NameInitialsPipe ],
    exports:      [ SidemenuComponent, DateFormatPipe, NameInitialsPipe ],
    providers:    [ ]
  })
export class ShareModule {}
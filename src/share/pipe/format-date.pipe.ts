import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dtformat' })
export class DateFormatPipe implements PipeTransform {
  transform(date: Date) {
    var options = {
        month: 'short',
        day: '2-digit',
        year: undefined
      };
    const auLocale = 'en-au';
      if (date) {
        let now = new Date();
        if (now.getFullYear() != date.getFullYear()) {
            options.year = '2-digit';
        }
        return date.toLocaleString(auLocale, options);
      } else {
        return '';
      } 
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dtformat' })
export class DateFormatPipe implements PipeTransform {
  transform(date: Date) {
    const anHourInMs = 60*60*1000;
    const aDayInMs = 24 * anHourInMs;
    if (date) {
      let now = new Date();
      if (Math.abs(now.getTime() - date.getTime()) > aDayInMs) {
        return this.dateOnly(date);
      } else {
        return this.timeOnly(date);
      }
    } else {
      return '';
    } 
  }

  private dateOnly(date: Date): string {
    const dateOptions = {
      month: 'short',
      day: '2-digit',
      year: undefined,
      weekday: undefined
    };
    const auLocale = 'en-au';
    let now = new Date();
    if (now.getFullYear() != date.getFullYear()) {
        dateOptions.year = '2-digit';
    }
    return date.toLocaleDateString(auLocale, dateOptions);
  }

  private timeOnly(date: Date): string {
    var timeOptions = {
      hour: '2-digit',
      minute: '2-digit'
    }
    const auLocale = 'en-au';
    const anHourInMs = 60*60*1000;

    let now = new Date();
    if (Math.abs(now.getTime() - date.getTime()) > anHourInMs) {
      return date.toLocaleTimeString(auLocale, timeOptions);
    } else {
      return (now.getMinutes() - date.getMinutes()) + ' ago'
    }
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nmInit' })
export class NameInitialsPipe implements PipeTransform {
  transform(name: string) {
    var initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
}
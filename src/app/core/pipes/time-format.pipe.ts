import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  private padZero(number: number): string {
    return number ? (number < 10 ? `0${number}` : `${number}`) : '';
  }
}

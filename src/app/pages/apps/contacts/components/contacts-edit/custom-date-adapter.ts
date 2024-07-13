import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // or any other appropriate provider scope
})
export class CustomDateAdapter extends NativeDateAdapter {

  // Override format method to format date as d/M/yyyy
  format(date: Date, displayFormat: string): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (displayFormat === 'input') {
      // Format the date as d/m/y
      return `${this._to2digit(day)}/${this._to2digit(month)}/${year}`;
    } else {
      // Use default format for other purposes
      return super.format(date, displayFormat);
    }
  }

  // Override parse method to parse date from d/M/yyyy format
  parse(value: any): Date | null {
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);

      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const CUSTOM_DATE_FORMATS = {
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OrderByService {
  constructor() {}

  public orderByColumn(records: Array<any>, columnPath: any, columnType: string, reverse: boolean = false) {
    columnType = columnType ? columnType.toLowerCase() : 'string';

    const reverseValue: number = reverse ? -1 : 1;

    return records.sort(
      (a: any, b: any): number => {
        let x = a,
          y = b;

        columnPath.split('.').forEach(column => {
          x = x[column];
          y = y[column];
        });

        if (columnType === 'boolean') {
          y = y == null ? false : y;
          x = x == null ? false : x;

          if (x < y) {
            return -1 * reverseValue;
          }

          if (x > y) {
            return 1 * reverseValue;
          }
        } else if (columnType === 'number' || columnType === 'float') {
          const numberX = parseFloat(x);
          const numberY = parseFloat(y);

          if (isNaN(numberX)) {
            return -1 * reverseValue;
          }

          if (isNaN(numberY)) {
            return 1 * reverseValue;
          }

          if (numberX < numberY) {
            return -1 * reverseValue;
          }
          if (numberX > numberY) {
            return 1 * reverseValue;
          }
        } else if (columnType === 'date') {
          const dateX = new Date(x);
          const dateY = new Date(y);

          if (!this.isValidDate(dateY) || dateX > dateY) {
            return -1 * reverseValue;
          }
          if (!this.isValidDate(dateX) || dateX < dateY) {
            return 1 * reverseValue;
          }
        }
        if (columnType === 'string') {
          if (isNullOrUndefined(x)) {
            x = '';
          }
          if (isNullOrUndefined(y)) {
            y = '';
          }

          if (x.toLowerCase() < y.toLowerCase()) {
            return -1 * reverseValue;
          }
          if (x.toLowerCase() > y.toLowerCase()) {
            return 1 * reverseValue;
          }
        }
      }
    );
  }

  private isValidDate(date: any): boolean {
    return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }
}

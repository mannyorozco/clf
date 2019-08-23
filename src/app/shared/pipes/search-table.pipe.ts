import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'searchTable'
})
export class SearchTablePipe implements PipeTransform {
  transform(records: any, searchInput: string, searchableColumns: string[]): any {
    if (isNullOrUndefined(searchInput) || isNullOrUndefined(searchableColumns) || records.length === 0) {
      return records;
    }

    searchInput = searchInput.toLowerCase();

    return records.filter((el: any) => {
      for (let x = 0; x < searchableColumns.length; x++) {
        const columnPath = searchableColumns[x];
        let activeElement = el;

        columnPath.split('.').forEach(column => {
          activeElement = activeElement[column];
        });

        if (!isNullOrUndefined(activeElement)) {
          if (
            activeElement
              .toString()
              .toLowerCase()
              .includes(searchInput)
          ) {
            return activeElement;
          }
        }
      }
    });
  }
}

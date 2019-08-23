import { Component, OnInit } from '@angular/core';
import { Firearm } from 'src/app/shared/models/firearm';
import { HomeService } from './home.service';
import { ColumnSort } from 'src/app/shared/models/column-sort';
import { isNullOrUndefined } from 'util';
import { OrderByService } from 'src/app/shared/services/order-by.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public firearms: Firearm[];
  public displayedColumns = [
    { name: 'Manufacturer', path: 'manufacturer', type: 'string', isActive: false, isReverse: false },
    { name: 'Model', path: 'model', type: 'string', isActive: false, isReverse: false },
    { name: 'Type', path: 'type', type: 'string', isActive: false, isReverse: false },
    { name: 'Barrel Length', path: 'barrelLength', type: 'number', isActive: false, isReverse: false },
    { name: 'Caliber', path: 'caliber', type: 'number', isActive: false, isReverse: false },
    { name: 'Expiration Date', path: 'expirationDate', type: 'Date', isActive: false, isReverse: false }
  ];

  constructor(private homeService: HomeService, private orderByService: OrderByService) {}

  public ngOnInit(): void {
    this.homeService.getFirearmList().subscribe(
      res => {
        console.log(res);
        this.firearms = res;
      },
      error => {
        console.error('Could not get firearms list ', error);
      }
    );
  }

  public onSortColumn(column: ColumnSort): void {
    if (!isNullOrUndefined(column)) {
      this.displayedColumns.forEach(columnSort => {
        if (columnSort.name === column.name) {
          columnSort.isActive = true;
          columnSort.isReverse = !columnSort.isReverse;
        } else {
          columnSort.isActive = false;
          columnSort.isReverse = false;
        }
      });
    }

    this.firearms = this.orderByService.orderByColumn(this.firearms, column.path, column.type, column.isReverse);

    console.log(this.firearms);
  }
}

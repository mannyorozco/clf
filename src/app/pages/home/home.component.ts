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

  public page = 1;
  public pageSize = 25;
  public collectionSize: number;

  public get firearmsWithPaging(): Firearm[] {
    if (this.firearms) {
      return this.firearms
        .map((firearm, i) => ({ id: i + 1, ...firearm }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

  constructor(private homeService: HomeService, private orderByService: OrderByService) {}

  public ngOnInit(): void {
    this.homeService.getFirearmList().subscribe(
      res => {
        this.firearms = res;
        this.collectionSize = res.length;
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
  }
}

import { Component, OnInit } from '@angular/core';
import { Firearm } from 'src/app/shared/models/firearm';
import { HomeService } from './home.service';
import { OrderByService } from 'src/app/shared/services/order-by.service';
import { isNullOrUndefined } from 'util';

export enum FilterCategory {
  'Manufactuer' = 0,
  'Caliber' = 1,
  'Type' = 2,
  'BarrelLength' = 3
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  pageItems: Array<Firearm>;
}

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public firearms: Firearm[];
  // public firearmsCopy: Firearm[];
  // public displayedColumns = [
  //   { name: 'Manufacturer', path: 'manufacturer', type: 'string', isActive: false, isReverse: false },
  //   { name: 'Model', path: 'model', type: 'string', isActive: false, isReverse: false },
  //   { name: 'Type', path: 'type', type: 'string', isActive: false, isReverse: false },
  //   { name: 'Barrel Length', path: 'barrelLength', type: 'number', isActive: false, isReverse: false },
  //   { name: 'Caliber', path: 'caliber', type: 'number', isActive: false, isReverse: false },
  //   { name: 'Expiration Date', path: 'expirationDate', type: 'Date', isActive: false, isReverse: false }
  // ];
  // public searchableColumns = ['manufacturer', 'model', 'type', 'barrelLength', 'caliber', 'expirationDate'];
  // public searchInput: string;

  public filteredList: Array<string> = [];
  public selectedCategory: number;
  public filterCategory = FilterCategory;
  public filterCategories: Array<FilterCategory> = [
    FilterCategory.Manufactuer,
    FilterCategory.Type,
    FilterCategory.Caliber,
    FilterCategory.BarrelLength
  ];
  public refinedFilterList: Firearm[];
  public pagination: Pagination;
  public pageSizeList = [10, 20, 50];

  constructor(private homeService: HomeService, private orderByService: OrderByService) {}

  public ngOnInit(): void {
    this.homeService.getFirearmList().subscribe(
      res => {
        this.firearms = [...res];
        // this.collectionSize = res.length;

        // // add manufactuerer id
        // this.manufacturers = this.filterUniqueStrings('manufacturer');
        // // add caliber id
        // this.calibers = this.filterUniqueStrings('caliber');
        // // add type id
        // this.types = this.filterUniqueStrings('type');
        // // add barrel length id
        // this.barrelLengths = this.filterUniqueStrings('barrelLength');
      },
      error => {
        console.error('Could not get firearms list ', error);
      }
    );
  }

  private filterUniqueStrings(filterValue: string): Array<string> {
    return this.firearms.map(value => value[filterValue]).filter((value, index, self) => self.indexOf(value) === index);
  }

  public onShowFilteredCategory(category: FilterCategory): void {
    this.selectedCategory = category;
    // reset list so it does not show on the ui
    this.refinedFilterList = [];

    switch (category) {
      case FilterCategory.Manufactuer:
        this.filteredList = this.filterUniqueStrings('manufacturer');
        break;
      case FilterCategory.Type:
        this.filteredList = this.filterUniqueStrings('type');
        break;
      case FilterCategory.Caliber:
        this.filteredList = this.filterUniqueStrings('caliber');
        break;
      case FilterCategory.BarrelLength:
        this.filteredList = this.filterUniqueStrings('barrelLength');
        break;
      default:
        console.error(`Could not find filter category ${category}`);
        break;
    }
  }

  public onShowRefinedList(item: string): void {
    // reset list so it does not show on the ui
    this.filteredList = [];

    switch (this.selectedCategory) {
      case FilterCategory.Manufactuer:
        this.refinedFilterList = [...this.firearms.filter(firearm => firearm.manufacturer.includes(item))];
        break;
      case FilterCategory.Caliber:
        this.refinedFilterList = [...this.firearms.filter(firearm => firearm.caliber.toString().includes(item))];
        break;
      case FilterCategory.Type:
        this.refinedFilterList = [...this.firearms.filter(firearm => firearm.type.includes(item))];
        break;
      case FilterCategory.BarrelLength:
        this.refinedFilterList = [...this.firearms.filter(firearm => firearm.barrelLength.toString().includes(item))];
        break;
      default:
        console.error(`Could not find filter category ${this.selectedCategory}`);
        break;
    }

    this.buildPagination();
  }

  public rebuildPaging(value): void {
    this.buildPagination(value, null);
  }

  private buildPagination(pageSize?: number, currentPage?: number): void {
    this.pagination = {
      currentPage: !isNullOrUndefined(currentPage) ? currentPage : 1,
      pageSize: !isNullOrUndefined(pageSize) ? pageSize : 10,
      totalItems: 0,
      pageItems: []
    };

    this.pagination.totalItems = Math.ceil(this.refinedFilterList.length / this.pagination.pageSize);

    const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
    this.pagination.pageItems = [...this.refinedFilterList.slice(startIndex, this.pagination.pageSize)];
  }

  // public onSortColumn(column: ColumnSort): void {
  //   if (!isNullOrUndefined(column)) {
  //     this.displayedColumns.forEach(columnSort => {
  //       if (columnSort.name === column.name) {
  //         columnSort.isActive = true;
  //         columnSort.isReverse = !columnSort.isReverse;
  //       } else {
  //         columnSort.isActive = false;
  //         columnSort.isReverse = false;
  //       }
  //     });
  //   }

  //   this.firearms = this.orderByService.orderByColumn(this.firearms, column.path, column.type, column.isReverse);
  // }
}

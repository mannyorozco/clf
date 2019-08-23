import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: '[sortable-column]',
  templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent {
  @Input() isActive?: boolean;
  @Input() isReverse?: boolean;
  @Output() sortChanged: EventEmitter<any> = new EventEmitter<any>();

  public sort(data: any): void {
    this.sortChanged.emit(data);
  }

  public get isColumnActive(): boolean {
    return !(isNullOrUndefined(this.isActive) || isNullOrUndefined(this.isReverse)) && this.isActive;
  }
}

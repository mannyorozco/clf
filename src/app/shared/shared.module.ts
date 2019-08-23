import { NgModule } from '@angular/core';
import { SortableColumnComponent } from './components/sortable-column-component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [SortableColumnComponent],
  exports: [SortableColumnComponent]
})
export class SharedModule {}

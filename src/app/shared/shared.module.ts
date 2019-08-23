import { NgModule } from '@angular/core';
import { SortableColumnComponent } from './components/sortable-column-component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgbModule, FormsModule],
  declarations: [SortableColumnComponent],
  exports: [SortableColumnComponent, NgbModule, CommonModule, FormsModule]
})
export class SharedModule {}

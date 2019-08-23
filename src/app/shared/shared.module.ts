import { NgModule } from '@angular/core';
import { SortableColumnComponent } from './components/sortable-column-component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SearchTablePipe } from './pipes/search-table.pipe';

@NgModule({
  imports: [CommonModule, NgbModule, FormsModule],
  declarations: [SortableColumnComponent, SearchTablePipe],
  exports: [SortableColumnComponent, SearchTablePipe, NgbModule, CommonModule, FormsModule]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { NormalComponent } from './normal/normal.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FootableComponent } from './footable/footable.component';
import { TableColorComponent } from './table-color/table-color.component';
import { JqueryDatatableComponent } from './jquery-datatable/jquery-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule
  ],
  declarations: [NormalComponent, EditableTableComponent, FootableComponent, TableColorComponent, JqueryDatatableComponent]
})
export class TablesModule { }

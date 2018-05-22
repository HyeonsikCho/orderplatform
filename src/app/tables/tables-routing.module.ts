import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditableTableComponent} from './editable-table/editable-table.component';
import {NormalComponent} from './normal/normal.component';
import {JqueryDatatableComponent} from './jquery-datatable/jquery-datatable.component';
import {TableColorComponent} from './table-color/table-color.component';
import {FootableComponent} from './footable/footable.component';

const routes: Routes = [
    {
        path: 'editable-table',
        component: EditableTableComponent
    },
    {
        path: 'normal',
        component: NormalComponent
    },
    {
        path: 'jquery-datatable',
        component: JqueryDatatableComponent
    },
    {
        path: 'table-color',
        component: TableColorComponent
    },
    {
        path: 'footables',
        component: FootableComponent
    },
    {
        path: '',
        redirectTo: 'normal',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app/app.component';
import {DataComponent} from './data/data.component';

const routes: Routes = [
    {
        path: 'app',
        component: AppComponent
    },
    {
        path: 'data',
        component: DataComponent
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }

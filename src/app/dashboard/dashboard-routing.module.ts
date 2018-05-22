import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {RtlComponent} from './rtl/rtl.component';
import {HorizontalComponent} from './horizontal/horizontal.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'rtl',
        component: RtlComponent
    },
    {
        path: 'horizontal',
        component: HorizontalComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

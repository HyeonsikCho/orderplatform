import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MorrisComponent} from './morris/morris.component';
import {FlotComponent} from './flot/flot.component';
import {ChartjsComponent} from './chartjs/chartjs.component';
import {SparklineComponent} from './sparkline/sparkline.component';
import {JqueryKnobComponent} from './jquery-knob/jquery-knob.component';

const routes: Routes = [
    {
        path: 'morris',
        component: MorrisComponent
    },
    {
        path: 'flot',
        component: FlotComponent
    },
    {
        path: 'chartjs',
        component: ChartjsComponent
    },
    {
        path: 'sparklines',
        component: SparklineComponent
    },
    {
        path: 'jquery-knob',
        component: JqueryKnobComponent
    },
    {
        path: '',
        redirectTo: 'morris',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }

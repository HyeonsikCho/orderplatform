import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { AppComponent } from './app/app.component';
import { DataComponent } from './data/data.component';

@NgModule({
  imports: [
    CommonModule,
    WidgetsRoutingModule
  ],
  declarations: [AppComponent, DataComponent]
})
export class WidgetsModule { }

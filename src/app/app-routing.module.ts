import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MainComponent }   from './main/main.component';
import { AboutComponent }   from './about/about.component';
import { ServicesComponent }   from './services/services.component';
import { ContactComponent }   from './contact/contact.component';

const routes: Routes = [
  { path : '', redirectTo: '/main', pathMatch: 'full'},
  { path : 'main', component: MainComponent },
  { path : 'about', component: AboutComponent },
  { path : 'contact', component: ContactComponent },
  { path : 'services', component: ServicesComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MainComponent }   from './main/main.component';
import { AboutComponent }   from './about/about.component';
import { ServicesComponent }   from './services/services.component';
import { ContactComponent }   from './contact/contact.component';
import { DesignEditorComponent }   from './design-editor/design-editor.component';

const routes: Routes = [
  { path : '', redirectTo: '/main', pathMatch: 'full'},
  { path : 'main', component: MainComponent },
  { path : 'about', component: AboutComponent },
  { path : 'contact', component: ContactComponent },
  { path : 'services', component: ServicesComponent },
  { path : 'design-editor', component: DesignEditorComponent },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
},
{
    path: 'app',
    loadChildren: './app.module#AppModule'
},
{
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
},
{
    path: 'user-interface',
    loadChildren: './user-interface/user-interface.module#UserInterfaceModule'
},
{
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule'
},
{
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule'
},
{
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule'
},
{
    path: 'widgets',
    loadChildren: './widgets/widgets.module#WidgetsModule'
},
{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
},
{
    path: 'sample-pages',
    loadChildren: './sample-pages/sample-pages.module#SamplePagesModule'
}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

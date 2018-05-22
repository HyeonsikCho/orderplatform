import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product-detail',
        component: ProductDetailComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }

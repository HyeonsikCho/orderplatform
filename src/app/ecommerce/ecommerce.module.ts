import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    EcommerceRoutingModule
  ],
  declarations: [DashboardComponent, ProductComponent, ProductDetailComponent, ProductListComponent]
})
export class EcommerceModule { }

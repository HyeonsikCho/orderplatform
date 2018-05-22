import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplePagesRoutingModule } from './sample-pages-routing.module';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PricingComponent } from './pricing/pricing.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [
    CommonModule,
    SamplePagesRoutingModule
  ],
  declarations: [BlankPageComponent, ProfileComponent, TimelineComponent, InvoiceComponent, SearchResultsComponent, PricingComponent, GalleryComponent]
})
export class SamplePagesModule { }

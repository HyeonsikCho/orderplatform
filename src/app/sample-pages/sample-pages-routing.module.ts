import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
    {
        path: 'blank-page',
        component: BlankPageComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 'timeline',
        component: TimelineComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'invoices',
        component: InvoiceComponent
    },
    {
        path: 'search-results',
        component: SearchResultsComponent
    },
    {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplePagesRoutingModule { }

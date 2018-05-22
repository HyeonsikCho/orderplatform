import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UiKitComponent } from './ui-kit/ui-kit.component';
import { AlertComponent } from './alert/alert.component';
import {CollapsedComponent} from './collapsed/collapsed.component';
import { ColorsComponent } from './colors/colors.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { IconsComponent } from './icons/icons.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { MediaObjectComponent } from './media-object/media-object.component';
import { ModalsComponent } from './modals/modals.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { RangeSlidersComponent } from './range-sliders/range-sliders.component';
import { SortableComponent } from './sortable/sortable.component';
import { TabsComponent } from './tabs/tabs.component';
import { WavesComponent } from './waves/waves.component';

const routes: Routes = [
    {
        path: 'ui-kit',
        component: UiKitComponent
    },
    {
        path: 'alerts',
        component: AlertComponent
    },
    {
        path: 'collapsed',
        component: CollapsedComponent
    },
    {
        path: 'colors',
        component: ColorsComponent
    },
    {
        path: 'dialogs',
        component: DialogsComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'list-groups',
        component: ListGroupComponent
    },
    {
        path: 'media-object',
        component: MediaObjectComponent
    },
    {
        path: 'modals',
        component: ModalsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'progressbars',
        component: ProgressBarsComponent
    },
    {
        path: 'range-sliders',
        component: RangeSlidersComponent
    },
    {
        path: 'sortable',
        component: SortableComponent
    },
    {
        path: 'tabs',
        component: TabsComponent
    },
    {
        path: 'waves',
        component: WavesComponent
    },
    {
        path: '',
        redirectTo: 'ui-kit',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInterfaceRoutingModule { }

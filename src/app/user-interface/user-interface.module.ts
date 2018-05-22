import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceRoutingModule } from './user-interface-routing.module';
import { UiKitComponent } from './ui-kit/ui-kit.component';
import { AlertComponent } from './alert/alert.component';
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
import { CollapsedComponent } from './collapsed/collapsed.component';

@NgModule({
  imports: [
    CommonModule,
    UserInterfaceRoutingModule
  ],
  declarations: [UiKitComponent,
      AlertComponent,
      ColorsComponent,
      DialogsComponent,
      IconsComponent,
      ListGroupComponent,
      MediaObjectComponent,
      ModalsComponent,
      NotificationsComponent,
      ProgressBarsComponent,
      RangeSlidersComponent,
      SortableComponent,
      TabsComponent,
      WavesComponent,
      CollapsedComponent]
})
export class UserInterfaceModule { }

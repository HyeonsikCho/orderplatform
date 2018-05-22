import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { PageOfflineComponent } from './page-offline/page-offline.component';
import { LockedComponent } from './locked/locked.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  declarations: [SingInComponent, SingUpComponent, ForgetPasswordComponent, Page404Component, Page500Component, PageOfflineComponent, LockedComponent]
})
export class AuthenticationModule { }

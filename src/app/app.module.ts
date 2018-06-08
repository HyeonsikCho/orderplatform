import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { DesignEditorComponent } from './design-editor/design-editor.component';
import { AuthorizationService } from './authentication/authorization.service';
import { UploadFileService } from './authentication/s3.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    DesignEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [
    AuthorizationService,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

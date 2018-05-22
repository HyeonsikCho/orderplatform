import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailSingleComponent } from './mail-single/mail-single.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileDashboardComponent } from './file-dashboard/file-dashboard.component';
import { FileDocumentsComponent } from './file-documents/file-documents.component';
import { FileImagesComponent } from './file-images/file-images.component';
import { FileMediaComponent } from './file-media/file-media.component';
import { BlogDashboardComponent } from './blog-dashboard/blog-dashboard.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    DropzoneModule
  ],
  declarations: [
      MailInboxComponent,
      MailComposeComponent,
      MailSingleComponent,
      ChatComponent,
      ContactComponent,
      CalendarComponent,
      FileDashboardComponent,
      FileDocumentsComponent,
      FileImagesComponent,
      FileMediaComponent,
      BlogDashboardComponent,
      BlogDetailsComponent,
      BlogGridComponent,
      BlogListComponent,
      BlogPostComponent
  ]
})
export class AppModule { }

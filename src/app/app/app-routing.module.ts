import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailSingleComponent } from './mail-single/mail-single.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FileMediaComponent} from './file-media/file-media.component';
import {FileImagesComponent} from './file-images/file-images.component';
import {FileDocumentsComponent} from './file-documents/file-documents.component';
import {FileDashboardComponent} from './file-dashboard/file-dashboard.component';
import {BlogDashboardComponent} from "./blog-dashboard/blog-dashboard.component";
import {BlogDetailsComponent} from "./blog-details/blog-details.component";
import {BlogGridComponent} from "./blog-grid/blog-grid.component";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogPostComponent} from "./blog-post/blog-post.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'mail-inbox',
        pathMatch: 'full'
    },
    {
        path: 'mail-inbox',
        component: MailInboxComponent
    },
    {
        path: 'mail-compose',
        component: MailComposeComponent
    },
    {
        path: 'mail-single',
        component: MailSingleComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'file-dashboard',
        component: FileDashboardComponent
    },
    {
        path: 'file-documents',
        component: FileDocumentsComponent
    },
    {
        path: 'file-images',
        component: FileImagesComponent
    },
    {
        path: 'file-media',
        component: FileMediaComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'blog-dashboard',
        component: BlogDashboardComponent
    },
    {
        path: 'blog-details',
        component: BlogDetailsComponent
    },
    {
        path: 'blog-grid',
        component: BlogGridComponent
    },
    {
        path: 'blog-list',
        component: BlogListComponent
    },
    {
        path: 'blog-post',
        component: BlogPostComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormAdvancedComponent} from './form-advanced/form-advanced.component';
import {FormBasicComponent} from './form-basic/form-basic.component';
import {FormExamplesComponent} from './form-examples/form-examples.component';
import {FormUploadComponent} from './form-upload/form-upload.component';
import {FormValidationComponent} from './form-validation/form-validation.component';
import {FormWizardComponent} from './form-wizard/form-wizard.component';
import {FormEditorsComponent} from './form-editors/form-editors.component';

const routes: Routes = [
    {
        path: 'form-advanced',
        component: FormAdvancedComponent
    },
    {
        path: 'form-basic',
        component: FormBasicComponent
    },
    {
        path: 'form-examples',
        component: FormExamplesComponent
    },
    {
        path: 'form-editors',
        component: FormEditorsComponent
    },
    {
        path: 'form-upload',
        component: FormUploadComponent
    },
    {
        path: 'form-validation',
        component: FormValidationComponent
    },
    {
        path: 'form-wizard',
        component: FormWizardComponent
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }

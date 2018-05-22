import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const CKEDITOR: any;

@Component({
  selector: 'app-form-editors',
  templateUrl: './form-editors.component.html',
  styleUrls: ['./form-editors.component.css']
})
export class FormEditorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          // CKEditor
          CKEDITOR.replace('ckeditor');
          CKEDITOR.config.height = 300;

      });
  }

}

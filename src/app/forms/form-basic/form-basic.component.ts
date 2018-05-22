import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormBasicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          $('.selectpicker').selectpicker();
          // Datetimepicker plugin
          $('.datetimepicker').bootstrapMaterialDatePicker({
              format: 'dddd DD MMMM YYYY - HH:mm',
              clearButton: true,
              weekStart: 1
          });

          $('.datepicker').bootstrapMaterialDatePicker({
              format: 'dddd DD MMMM YYYY',
              clearButton: true,
              weekStart: 1,
              time: false
          });

          $('.timepicker').bootstrapMaterialDatePicker({
              format: 'HH:mm',
              clearButton: true,
              date: false
          });
      });
  }

}

import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const editableTableWidget: any;

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          $('#mainTable').editableTableWidget();
      });
  }

}

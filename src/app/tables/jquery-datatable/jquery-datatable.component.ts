import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-jquery-datatable',
  templateUrl: './jquery-datatable.component.html',
  styleUrls: ['./jquery-datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JqueryDatatableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          $('.js-basic-example').DataTable();

          // Exportable table
          $('.js-exportable').DataTable({
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          });
      });
  }

}

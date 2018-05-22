import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SortableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          $('.dd').nestable();

          $('.dd').on('change', function () {
              const $this = $(this);
              const serializedData = JSON.stringify($($this).nestable('serialize'));

              $this.parents('div.body').find('textarea').val(serializedData);
          });
      });
  }

}

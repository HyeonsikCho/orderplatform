import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          $('#aniimated-thumbnials').lightGallery({
              thumbnail: true,
              selector: 'a'
          });
      });
  }

}

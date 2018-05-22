import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.table').footable({
          'paging': {
              'enabled': true
          },
          'sorting': {
              'enabled': true
          }
      });
  }

}

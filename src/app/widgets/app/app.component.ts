import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // Bar charts using inline values
      $('.sparkbar').sparkline('html', { type: 'bar' });
      $('.chat-widget').slimscroll({
          height: '300px',
          color: 'rgba(0,0,0,0.4)',
          size: '2px',
          alwaysVisible: false,
          borderRadius: '3px',
          railBorderRadius: '2px'
      });
  }

}

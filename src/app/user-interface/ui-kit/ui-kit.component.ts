import { Component, OnInit } from '@angular/core';

declare  const $: any;

@Component({
  selector: 'app-ui-kit',
  templateUrl: './ui-kit.component.html',
  styleUrls: ['./ui-kit.component.css']
})
export class UiKitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.ml-menu li a').on('click', function () {
          $(this).addClass('toggled');
      });
  }

}

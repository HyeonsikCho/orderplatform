import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.list_btn').on('click', function() {
          $('#plist').toggleClass('open');
      });
  }

}

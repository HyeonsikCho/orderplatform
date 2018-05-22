import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const CKEDITOR: any;

@Component({
  selector: 'app-mail-compose',
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.css']
})
export class MailComposeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          // CKEditor
          CKEDITOR.replace('ckeditor');
          CKEDITOR.config.height = 300;

      });
      // Collapse or Expand Menu
      $('.menu-toggle').on('click', function(e) {
          const $this = $(this);
          const $content = $this.next();

          if ($($this.parents('ul')[0]).hasClass('list')) {
              const $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');
              $.each($('.menu-toggle.toggled').not($not).next(), function(i, val) {
                  if ($(val).is(':visible')) {
                      $(val).prev().toggleClass('toggled');
                      $(val).slideUp();
                  }
              });
          }

          $this.toggleClass('toggled');
          $content.slideToggle(320);
      });

      $('.sidebar .menu .list').slimscroll({
          height: 'calc(100vh - 65px)',
          color: 'rgba(0,0,0,0.2)',
          position: 'left',
          size: '2px',
          alwaysVisible: false,
          borderRadius: '3px',
          railBorderRadius: '0'
      });
  }

}

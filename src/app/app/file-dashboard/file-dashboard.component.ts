import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-file-dashboard',
  templateUrl: './file-dashboard.component.html',
  styleUrls: ['./file-dashboard.component.css']
})
export class FileDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      Morris.Bar({
          element: 'm_bar_chart',
          data: [{
              y: '2011',
              Documents: 80,
              Media: 56,
              Images: 89
          }, {
              y: '2012',
              Documents: 75,
              Media: 65,
              Images: 38
          }, {
              y: '2013',
              Documents: 59,
              Media: 30,
              Images: 37
          }, {
              y: '2014',
              Documents: 75,
              Media: 65,
              Images: 40
          }, {
              y: '2015',
              Documents: 55,
              Media: 40,
              Images: 45
          }, {
              y: '2016',
              Documents: 75,
              Media: 65,
              Images: 40
          }, {
              y: '2017',
              Documents: 87,
              Media: 88,
              Images: 36
          }],
          xkey: 'y',
          ykeys: ['Documents', 'Media', 'Images'],
          labels: ['Documents', 'Media', 'Images'],
          barColors: ['#6a7885', '#67d7e5', '#ffde78'],
          hideHover: 'auto',
          gridLineColor: '#eef0f2',
          resize: true
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
      menuToggle();
      function menuToggle() {
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
      }
  }

}

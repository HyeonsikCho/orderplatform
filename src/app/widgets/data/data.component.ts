import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
          initLoading();
          initCounters();
          initCharts();
          initSparkline();
      });

      // Sparkline
      function initSparkline() {
          $('.sparkline').each(function() {
              const $this = $(this);
              $this.sparkline('html', $this.data());
          });
      }

      // Init Loading
      function initLoading() {
          $('[data-toggle="cardloading"]').on('click', function () {
              const effect = $(this).data('loadingEffect');
              const $loading = $(this).parents('.card').waitMe({
                  effect: effect,
                  text: 'Loading...',
                  bg: 'rgba(255,255,255,0.90)',
                  color: '#555'
              });

              setTimeout(function () {
                  // Loading hide
                  $loading.waitMe('hide');
              }, 3200);
          });
      }
      // Widgets count plugin
      function initCounters() {
          $('.count-to').countTo();
      }

      // Charts
      function initCharts() {
          // Chart Bar
          $('.chart.chart-bar').sparkline(undefined, {
              type: 'bar',
              barColor: '#fff',
              negBarColor: '#fff',
              barWidth: '4px',
              height: '34px'
          });

          // Chart Pie
          $('.chart.chart-pie').sparkline(undefined, {
              type: 'pie',
              height: '50px',
              sliceColors: ['rgba(255,255,255,0.70)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']
          });

          // Chart Line
          $('.chart.chart-line').sparkline(undefined, {
              type: 'line',
              width: '60px',
              height: '45px',
              lineColor: '#fff',
              lineWidth: 1.3,
              fillColor: 'rgba(0,0,0,0)',
              spotColor: 'rgba(255,255,255,0.40)',
              maxSpotColor: 'rgba(255,255,255,0.40)',
              minSpotColor: 'rgba(255,255,255,0.40)',
              spotRadius: 3,
              highlightSpotColor: '#fff'
          });

          $('#linecustom1').sparkline('html', {
              height: '35px',
              width: '100%',
              lineColor: '#e5d1e4',
              fillColor: '#f3e8f2',
              minSpotColor: true,
              maxSpotColor: true,
              spotColor: '#e2a8df',
              spotRadius: 1
          });

          $('#linecustom2').sparkline('html', {
              height: '35px',
              width: '100%',
              lineColor: '#c9e3f4',
              fillColor: '#dfeefa',
              minSpotColor: true,
              maxSpotColor: true,
              spotColor: '#8dbfe0',
              spotRadius: 1
          });

          $('#linecustom3').sparkline('html', {
              height: '35px',
              width: '100%',
              lineColor: '#efded3',
              fillColor: '#f8f0ea',
              minSpotColor: true,
              maxSpotColor: true,
              spotColor: '#e0b89d',
              spotRadius: 1
          });
      }

      $('.knob').knob({
          draw: function () {
              // "tron" case
              if (this.$.data('skin') === 'tron') {

                  const a = this.angle(this.cv)  // Angle
                      ,  r = true;
                  let sa = this.startAngle          // Previous start angle
                      , ea                            // Previous end angle
                      , sat = this.startAngle         // Start angle
                      , eat = sat + a;                 // End angle

                  this.g.lineWidth = this.lineWidth;

                  this.o.cursor
                  && (sat = eat - 0.3)
                  && (eat = eat + 0.3);

                  if (this.o.displayPrevious) {
                      ea = this.startAngle + this.angle(this.value);
                      this.o.cursor
                      && (sa = ea - 0.3)
                      && (ea = ea + 0.3);
                      this.g.beginPath();
                      this.g.strokeStyle = this.previousColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                      this.g.stroke();
                  }

                  this.g.beginPath();
                  this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                  this.g.stroke();

                  this.g.lineWidth = 2;
                  this.g.beginPath();
                  this.g.strokeStyle = this.o.fgColor;
                  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                  this.g.stroke();

                  return false;
              }
          }
      });
  }

}

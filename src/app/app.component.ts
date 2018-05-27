import { Component, OnInit, Renderer2 } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

declare const $: any;
declare const jquery: any;
declare const screenfull: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  previousUrl: string;

    constructor(private renderer: Renderer2, private router: Router) {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    if (this.previousUrl) {
                        this.renderer.removeClass(document.body, this.previousUrl);
                    }
                    const currentUrl = event.url.split('/');
                    const currentUrlSlug = currentUrl[currentUrl.length - 1];
                    if (currentUrlSlug) {
                        this.renderer.addClass(document.body, currentUrlSlug);
                    }
                    this.previousUrl = currentUrlSlug;
                }
            });

    }

    ngOnInit() {
      $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
      // Checks if li has sub (ul) and adds class for toggle icon - just an UI

      $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');

      $('.menu > ul > li').hover(function(e) {
          if ($(window).width() > 943) {
              $(this).children('ul').stop(true, false).fadeToggle(150);
              e.preventDefault();
          }
      });

      // If width is more than 943px dropdowns are displayed on hover
      $('.menu > ul > li').click(function() {
          if ($(window).width() <= 943) {
              $(this).children('ul').fadeToggle(150);
          }
      });

      $('.h-bars').click(function(e) {
          $('.menu > ul').toggleClass('show-on-mobile');
          e.preventDefault();
      });

      $('.sparkline').each(function() {
          const $this = $(this);
          $this.sparkline('html', $this.data());
      });

      // ===============================================================================
      $(window).on('scroll', function() {
          $('.card .sparkline').each(function() {
              const imagePos = $(this).offset().top;
              const topOfWindow = $(window).scrollTop();
              if (imagePos < topOfWindow + 400) {
                  $(this).addClass('pullUp');
              }
          });
      });

      // ===============================================================================
      $('.dial1').knob();
      $({animatedVal: 0}).animate({animatedVal: 66}, {
          duration: 4000,
          easing: 'swing',
          step: function() {
              $('.dial1').val(Math.ceil(this.animatedVal)).trigger('change');
          }
      });
      $('.dial2').knob();
      $({animatedVal: 0}).animate({animatedVal: 26}, {
          duration: 4500,
          easing: 'swing',
          step: function() {
              $('.dial2').val(Math.ceil(this.animatedVal)).trigger('change');
          }
      });
      $('.dial3').knob();
      $({animatedVal: 0}).animate({animatedVal: 76}, {
          duration: 3800,
          easing: 'swing',
          step: function() {
              $('.dial3').val(Math.ceil(this.animatedVal)).trigger('change');
          }
      });
      $('.dial4').knob();
      $({animatedVal: 0}).animate({animatedVal: 88}, {
          duration: 5200,
          easing: 'swing',
          step: function() {
              $('.dial4').val(Math.ceil(this.animatedVal)).trigger('change');
          }
      });

    }
}

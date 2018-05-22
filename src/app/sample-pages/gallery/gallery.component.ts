import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import 'fabric';
declare const fabric: any;
declare const $: any;
declare const jquery: any;
declare const screenfull: any;

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DesignEditorComponent {

  private canvas: any;
  private props: any = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };

  private textString: string;
  private url: string = '';
  private size: any = {
    width: 1000,
    height: 620
  };

  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private selected: any;
  private templates : string[] = [

    //1
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":{"type":"linear","coords":{"x1":0,"y1":-63.8,"x2":0,"y2":638},"colorStops":[{"offset":"0","color":"rgb(255,255,255)","opacity":1},{"offset":"1","color":"rgb(255,255,255)","opacity":1}],"offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"image","originX":"left","originY":"top","left":-1.17,"top":0.38,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.02,"scaleY":1.02,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/nametag_background_v19_2.jpg","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"image","originX":"left","originY":"top","left":711.09,"top":202.63,"width":206,"height":206,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.65,"scaleY":0.65,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/idcard_tempate_yellow_logo.png","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":584.35,"top":346.74,"width":283.71,"height":41.95,"fill":"#313131","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.68,"scaleY":1.77,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"CV. K7 PRODUCTION","fontSize":32,"fontWeight":"normal","fontFamily":"Passion One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":600.12,"top":404.27,"width":576.16,"height":41.95,"fill":"#343434","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.64,"scaleY":0.64,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"PROFESSIONAL & BERPENGALAMAN","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',

    //2
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#b760e6","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"image","originX":"left","originY":"top","left":-2,"top":-0.39,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.02,"scaleY":1.02,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/nametag_background_v18_1.jpg","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"image","originX":"left","originY":"top","left":450.4,"top":185.67,"width":256,"height":256,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.45,"scaleY":0.45,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/your_logo_white.png","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":367.05,"top":349.14,"width":266.67,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.06,"scaleY":1.06,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"COMPANY NAME","fontSize":32,"fontWeight":"bold","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":419.82,"top":388.25,"width":257.73,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.73,"scaleY":0.73,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Your Tagline Here","fontSize":32,"fontWeight":"bold","fontFamily":"Poiret One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    //'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#1A1A1A","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"image","originX":"left","originY":"top","left":11.57,"top":8.65,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.99,"scaleY":0.99,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/ccs.png","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":108.24,"top":123.25,"width":1060.65,"height":117.97,"fill":"#171717","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.44,"scaleY":0.44,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"PT. GRAHA DIRGANTARA","fontSize":90,"fontWeight":"bold","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{},"name":"text1"},{"type":"i-text","originX":"left","originY":"top","left":118.16,"top":362.88,"width":255.07,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Design & Printing","fontSize":32,"fontWeight":"bold","fontFamily":"Raleway","fontStyle":"italic","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":116.72,"top":404.63,"width":536.51,"height":83.89,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Jl. Ahmad Yani No.192, Tegal parang Jakarta Selatan","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":116.72,"top":479.51,"width":316.03,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"www.grahadirga.com","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    
    //3
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.44,"scaleY":1.44,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.44,"scaleY":1.44,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","originX":"left","originY":"top","left":1.25,"top":-1.07,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.02,"scaleY":1.02,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/nametag_background_v13_2.jpg","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":361.08,"top":130.7,"width":195.56,"height":41.95,"fill":"#3a93ff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.51,"scaleY":1.51,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"YOUR NAME","fontSize":32,"fontWeight":"bold","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":422.21,"top":192.15,"width":209.89,"height":41.95,"fill":"#3a93ff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.85,"scaleY":0.85,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"[ Job Position ]","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":69.06,"top":379.96,"width":325.34,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.93,"scaleY":0.93,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"PT. COMPANY NAME","fontSize":32,"fontWeight":"bold","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":67.27,"top":430.64,"width":375.33,"height":83.89,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.8,"scaleY":0.8,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Jl. Soekarno Hatta No.199 Kota Bandung","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":599.68,"top":371.03,"width":244.19,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.84,"scaleY":0.84,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"(+6222) 54273722","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":602.08,"top":428.82,"width":337.31,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.83,"scaleY":0.83,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"info@yourwebsite.com","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":603.29,"top":483.63,"width":339.39,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.81,"scaleY":0.81,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"www.yourwebsite.com","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    
    //4
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.99,"scaleY":2.99,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.99,"scaleY":2.99,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.99,"scaleY":2.99,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","originX":"left","originY":"top","left":525.93,"top":259.81,"width":53.89,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.95,"scaleY":4.95,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"logo","fontSize":32,"fontWeight":"bold","fontFamily":"Handlee","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"image","originX":"left","originY":"top","left":-0.49,"top":0.51,"width":1000,"height":627,"fill":"#ffffff","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.02,"scaleY":1.02,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/nametag_background_v10_2.jpg","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":129.68,"top":278.01,"width":53.89,"height":41.95,"fill":"#145876","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":4.44,"scaleY":4.44,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"logo","fontSize":32,"fontWeight":"bold","fontFamily":"Handlee","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":159.89,"top":281.1,"width":62.25,"height":41.95,"fill":"#145876","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.57,"scaleY":1.57,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"your","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":490.83,"top":177.26,"width":195.56,"height":41.95,"fill":"#145876","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.4,"scaleY":1.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"YOUR NAME","fontSize":32,"fontWeight":"bold","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":500.9,"top":223.09,"width":209.89,"height":41.95,"fill":"#135471","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"[ Job Position ]","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":557.04,"top":286.44,"width":262.45,"height":41.95,"fill":"#135674","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"(+6221) 03459325","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":557.04,"top":339.72,"width":391.77,"height":41.95,"fill":"#135674","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"info@companywebsite.com","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":558.48,"top":392.99,"width":377.08,"height":41.95,"fill":"#135471","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Jl.Soekarno Hatta, Jakarta","fontSize":32,"fontWeight":"normal","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    
    //5
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#151515","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#151515","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","originX":"left","originY":"top","left":98.01,"top":250.57,"width":349.86,"height":41.95,"fill":"#dec183","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.34,"scaleY":2.34,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Graha Dirgantara","fontSize":32,"fontWeight":"normal","fontFamily":"Cinzel Decorative","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    
    //6
    '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":{"type":"linear","coords":{"x1":0,"y1":-63.8,"x2":0,"y2":638},"colorStops":[{"offset":"0","color":"rgb(255,255,255)","opacity":1},{"offset":"1","color":"rgb(255,255,255)","opacity":1}],"offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"i-text","originX":"left","originY":"top","left":90,"top":100,"width":364.97,"height":117.97,"fill":"#F6DDC6","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"[ TEXT ] ","fontSize":90,"fontWeight":"bold","fontFamily":"arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{},"name":"text1"},{"type":"image","originX":"left","originY":"top","left":3.29,"top":0.74,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/nametag_background_v12_1.jpg","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":69.45,"top":51.89,"width":220.48,"height":138.94,"fill":"#1394e1","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.2,"scaleY":1.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"logo","fontSize":"106","fontWeight":"bold","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":106.64,"top":59.51,"width":94.94,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.09,"scaleY":1.09,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"YOUR","fontSize":32,"fontWeight":"normal","fontFamily":"Julius Sans One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":74.85,"top":473.36,"width":189.89,"height":41.95,"fill":"#7b7b7b","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.52,"scaleY":1.52,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"COMPANY NAME","fontSize":32,"fontWeight":"normal","fontFamily":"Passion One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":77.87,"top":526.89,"width":361.92,"height":83.89,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.79,"scaleY":0.79,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Salogan of the company goes here","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}',
    //'{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","originX":"left","originY":"top","left":138.29,"top":243.6,"width":246.05,"height":41.95,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":3.01,"scaleY":3.01,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"YOUR COMPANY","fontSize":32,"fontWeight":"normal","fontFamily":"Poiret One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}'
    //'{"objects":[{"type":"image","originX":"left","originY":"top","left":-194.78022222222216,"top":-157.92555555555566,"width":2250,"height":1457.5,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.68933823529412,"scaleY":0.68933823529412,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"image_1335563018565","evented":true,"alignX":"none","alignY":"none","meetOrSlice":"meet","selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"src":"assets/images/templates/wood_texture23.jpg","filters":[],"resizeFilters":[],"crossOrigin":"Anonymous"},{"type":"image","originX":"left","originY":"top","left":316.9364444444445,"top":100.84629629629632,"width":500,"height":500,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.99341820005636,"scaleY":0.97221525548422,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0.28,"skewY":0,"id":"image_1335569017815","evented":true,"alignX":"none","alignY":"none","meetOrSlice":"meet","selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"src":"assets/images/templates/urban-furniture_black-logo.png","filters":[],"resizeFilters":[],"crossOrigin":"Anonymous"},{"type":"i-text","originX":"left","originY":"top","left":435.05,"top":212.81,"width":252.7982635498047,"height":103.5833333333337,"fill":"rgb(255,255,255)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":1506622601017,"data":{"label":"Comapany","editable":true,"keepWidth":0,"maxWidth":375,"snapTo":true},"evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"URBAN","fontSize":91.666666666667,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":0.94,"textDecoration":"","textAlign":"center","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":438.97511111111,"top":338.18296296296,"width":252.75991821289062,"height":45.199999999999996,"fill":"rgb(235,207,156)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":1506622607137,"data":{"label":"Service","editable":true,"keepWidth":0,"maxWidth":375,"snapTo":true},"evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"FURNITURE","fontSize":40,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":497.5,"top":196.67,"width":0,"height":45.199999999999996,"fill":"rgb(235,207,156)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"text_1335569049290","evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"","fontSize":40,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":498.37,"top":421.64,"width":108.25578308105469,"height":37.66666666666629,"fill":"rgb(255,255,255)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":1506622615979,"data":{"label":"Established","editable":true,"keepWidth":0,"maxWidth":200,"snapTo":true},"evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"Est.1979","fontSize":33.333333333333,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"center","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":424.98,"top":304.14,"width":276.51947021484375,"height":22.599999999999998,"fill":"rgb(255,255,255)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"text_1335569254975","evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"..............................................................","fontSize":20,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":424.98,"top":382.47,"width":276.51947021484375,"height":22.599999999999998,"fill":"rgb(255,255,255)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"text_1335569294532","evented":true,"selectable":true,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"text":"..............................................................","fontSize":20,"fontWeight":400,"fontFamily":"RopaSans","fontStyle":"","lineHeight":1,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"path","originX":"left","originY":"top","left":0,"top":0,"width":1125,"height":675,"fill":"#6DCFF6","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"evenodd","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"bleed","evented":false,"selectable":false,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"path":[["M",0,0],["H",1125],["V",675],["H",0],["z"],["M",37.5,37.5],["H",1087.5],["V",637.5],["H",37.5],["z"]],"pathOffset":{"x":562.5,"y":337.5}},{"type":"path","originX":"left","originY":"top","left":37.5,"top":37.5,"width":1050,"height":600,"fill":"#BAE4FA","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"evenodd","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"safety","evented":false,"selectable":false,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"path":[["M",0,0],["H",1050],["V",600],["H",0],["z"],["M",37.5,37.5],["H",1012.5],["V",562.5],["H",37.5],["z"]],"pathOffset":{"x":525,"y":300}},{"type":"rect","originX":"left","originY":"top","left":37.5,"top":37.5,"width":1050,"height":600,"fill":"transparent","stroke":"#000000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0.5,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"trim","evented":false,"selectable":false,"lockMovementX":false,"lockMovementY":false,"lockScalingX":false,"lockScalingY":false,"lockUniScaling":false,"lockRotation":false,"rx":0,"ry":0}],"background":"#FFFFFF","width":1125,"height":675,"clipTo":null,"backgroundColor":"#FFFFFF"}'
    
    //7
    '{"objects":[{"type":"rect","version":"2.2.4","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"2.2.4","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"2.2.4","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#fff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","version":"2.2.4","originX":"left","originY":"top","left":0,"top":-3.46,"width":1016,"height":638,"fill":"#ff5c5c","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.07,"scaleY":2.07,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","version":"2.2.4","originX":"left","originY":"top","left":0.49,"top":-3.04,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.02,"scaleY":1.02,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"crossOrigin":"Anonymous","cropX":0,"cropY":0,"src":"http://localhost:4200/assets/images/templates/nametag_background_v18_2.jpg","filters":[]},{"type":"i-text","version":"2.2.4","originX":"left","originY":"top","left":668.01,"top":291.23,"width":171.25,"height":36.16,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.55,"scaleY":1.41,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"사장 조현식","fontSize":32,"fontWeight":"bold","fontFamily":"Passion One","fontStyle":"","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"2.2.4","originX":"left","originY":"top","left":122.44,"top":218.5,"width":230.48,"height":36.16,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.61,"scaleY":0.61,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"010-5015-7915","fontSize":32,"fontWeight":"bold","fontFamily":"Julius Sans One","fontStyle":"","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"2.2.4","originX":"left","originY":"top","left":122.45,"top":292.81,"width":472.33,"height":78.11,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.61,"scaleY":0.61,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"서울특별시 성북구 숭인로 2길","fontSize":32,"fontWeight":"bold","fontFamily":"Julius Sans One","fontStyle":"","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"2.2.4","originX":"left","originY":"top","left":121.25,"top":386.32,"width":397.84,"height":78.11,"fill":"#ffffff","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.61,"scaleY":0.61,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"www.hsfinance.co.kr hyeonsik5015@naver.com","fontSize":32,"fontWeight":"bold","fontFamily":"Julius Sans One","fontStyle":"","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}]}'
  ]

  constructor() { }

  ngOnInit() {

    //setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'lightblue',
      selectionLineWidth: 0.5,
      preserveObjectStacking : true
    });

    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {

        let selectedObject = e.target;
        this.selected = selectedObject
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        //selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              console.log('image');
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    // get references to the html canvas element & its context
    // this.canvas.on('mouse:down', (e) => {
    // let canvasElement: any = document.getElementById('canvas');
    // console.log(canvasElement)
    // });

    $('.theme-light-dark .t-light').on('click', function() {
      $('body').removeClass('menu_dark');
  });

  $('.theme-light-dark .t-dark').on('click', function() {
      $('body').addClass('menu_dark');
  });

  $('.m_img_btn').on('click', function() {
      $('body').toggleClass('menu_img');
  });

  $('.boxs-close').on('click', function(){
      const element = $(this);
      const cards = element.parents('.card');
      cards.addClass('closed').fadeOut();
  });

  }


  /*------------------------Block elements------------------------*/

  //Block "Size"

  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  //Block "Add text"

  addText() {
    let textString = this.textString;
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';
  }

  //Block "Add images"

  getImgPolaroid(event: any) {
    let el = event.target;
    fabric.Image.fromURL(el.src, (image) => {
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 0,
        cornersize: 10,
        hasRotatingPoint: true,
        peloas: 12
      });
      image.width = image.getScaledWidth();
      image.height = image.getScaledHeight();
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  //Block "Upload Image"

  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 0,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.width = image.getScaledWidth();
        image.height = image.getScaledHeight();
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };

  //Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    let val = this.props.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }


  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    } else {
      iclass += ` ${value}`
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/


  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }
    else if (activeGroup) {
      //let objectsInGroup = activeGroup.getObjects();
      for (var item of activeGroup) {
        this.canvas.remove(item);
      }
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      for (var item of activeGroup) {
        item.bringToFront();
      }
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.sendToBack();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      for (var item of activeGroup) {
        item.sendToBack();
      }
    }
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

  rasterize() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      console.log(this.canvas.toDataURL('png'))
      //window.open(this.canvas.toDataURL('png'));
      var image = new Image();
      image.src = this.canvas.toDataURL('png')
      var w = window.open("");
      w.document.write(image.outerHTML);
    }
  }

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    let json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  loadCanvasFromJSON() {
    //let CANVAS = localStorage.getItem('Kanvas');
    let CANVAS = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":"#1A1A1A","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"image","originX":"left","originY":"top","left":11.57,"top":8.65,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.99,"scaleY":0.99,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/ccs.png","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":108.24,"top":123.25,"width":1060.65,"height":117.97,"fill":"#171717","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.44,"scaleY":0.44,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"PT. GRAHA DIRGANTARA","fontSize":90,"fontWeight":"bold","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{},"name":"text1"},{"type":"i-text","originX":"left","originY":"top","left":118.16,"top":362.88,"width":255.07,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Design & Printing","fontSize":32,"fontWeight":"bold","fontFamily":"Raleway","fontStyle":"italic","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":116.72,"top":404.63,"width":536.51,"height":83.89,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Jl. Ahmad Yani No.192, Tegal parang Jakarta Selatan","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":116.72,"top":479.51,"width":316.03,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.9,"scaleY":0.9,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"www.grahadirga.com","fontSize":32,"fontWeight":"normal","fontFamily":"Raleway","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}';
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });

  };

  applyTemplate(value) {
    let template = this.templates[value];
    console.log(template);
    //template = '{"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":1016,"height":638,"fill":{"type":"linear","coords":{"x1":0,"y1":-63.8,"x2":0,"y2":638},"colorStops":[{"offset":"0","color":"rgb(255,255,255)","opacity":1},{"offset":"1","color":"rgb(255,255,255)","opacity":1}],"offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"recx"},{"type":"image","originX":"left","originY":"top","left":-42.26,"top":-2.88,"width":1000,"height":627,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.01,"scaleY":1.03,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"src":"assets/images/templates/bussiness_card_hitam.png","filters":[],"crossOrigin":"Anonymous","alignX":"none","alignY":"none","meetOrSlice":"meet"},{"type":"i-text","originX":"left","originY":"top","left":55.47,"top":229.58,"width":356.49,"height":117.97,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.85,"scaleY":0.85,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"YOUR TEXT","fontSize":90,"fontWeight":"normal","fontFamily":"Passion One","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{},"name":"text1"},{"type":"i-text","originX":"left","originY":"top","left":60.6,"top":302.41,"width":321.83,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.92,"scaleY":0.92,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"GRAPHIC DESIGNER","fontSize":32,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":528.24,"top":136.83,"width":262.45,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.17,"scaleY":1.17,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"(+6221) 54273774","fontSize":32,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":523.93,"top":293.77,"width":362.8,"height":83.89,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.17,"scaleY":1.17,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Your Address, City, Town Country,44111","fontSize":32,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}},{"type":"i-text","originX":"left","originY":"top","left":528.25,"top":479.51,"width":318.31,"height":41.95,"fill":"#000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.17,"scaleY":1.17,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"www.yourwebsite.com","fontSize":32,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{}}],"background":""}';
    this.canvas.loadFromJSON(template, () => {
      console.log('CANVAS untar');
      console.log(template);

      this.canvas.renderAll();


    });
  }

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

}

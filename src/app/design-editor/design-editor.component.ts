import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { AuthorizationService } from "../authentication/authorization.service";
import { UploadFileService } from "../authentication/s3.service";

import 'fabric';
declare const fabric: any;
declare const $: any;
declare const jquery: any;
declare const screenfull: any;

type Template = { Index : Number, Content : String, Thumbnail : String, Width : Number, Height : Number  };
type Object = { Index : Number, Content : String, Kind : String };

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DesignEditorComponent {
  private canvas: any;
  public props: any = {
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

  public textString: string;
  public url: string = '';
  public size: any = {
    width: 1000,
    height: 620
  };

  private json: any;
  private globalEditor: boolean = false;
  public textEditor: boolean = false;
  private imageEditor: boolean = false;
  public figureEditor: boolean = false;
  public selected: any;
  public templates : Array<Template> = new Array<Template>();
  public objects : Array<Object> = new Array<Object>();

  constructor(private http: Http, private uploadService: UploadFileService, private auth: AuthorizationService) { }

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

  var that = this;
  this.http.get('https://bpxmjwpjgj.execute-api.ap-northeast-2.amazonaws.com/prod/get-template')
    .subscribe(
      response => {
        that.templates = response.json()['Items'];
      },
      error => {
        console.log(error);
     }
    );

    
    this.http.get('https://bpxmjwpjgj.execute-api.ap-northeast-2.amazonaws.com/prod/get-object')
    .subscribe(
      response => {
        that.objects = response.json()['Items'];
      },
      error => {
        console.log(error);
     }
    );
    
  }


  /*------------------------Block elements------------------------*/
  //Block "Size"
  changeSize() {
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
      var today = new Date();
      var ext = event.target.files[0].name.split('.').pop();
      
      var userName = this.auth.getAuthenticatedUser();
      if(userName == null) {
        alert("로그인이 필요합니다.");
        return;
      }

      var date = today.toISOString().substring(0, 10);
      date = date.split('-')[0] + date.split('-')[1] + date.split('-')[2];

      var path = "users/custom_material/" + date + "/" + userName.getUsername();
      var timestamp = today.getTime();
      var fileName = timestamp + "." + ext;

      const params = new URLSearchParams();
      params.append('userid',userName.getUsername());
      params.append('timestamp',path);
      params.append('type', "image");
      params.append('path',path);
      params.append('filename',fileName);
      
      this.uploadService.uploadfile(params, event.target.files[0])
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
    console.log(this.canvas.toSVG());
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
    let template = this.templates[value - 1].Content;
    this.canvas.setWidth(this.templates[value - 1].Width);
    this.canvas.setHeight(this.templates[value - 1].Height);
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

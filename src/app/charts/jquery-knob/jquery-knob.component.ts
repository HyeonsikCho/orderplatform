import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-jquery-knob',
  templateUrl: './jquery-knob.component.html',
  styleUrls: ['./jquery-knob.component.css']
})
export class JqueryKnobComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $(function () {
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
      });
  }

}

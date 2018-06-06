import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthorizationService} from "../authorization.service";
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SingInComponent implements OnInit {

  year = (new Date()).getFullYear();
  emailVerificationMessage: boolean = false;

  constructor(private auth: AuthorizationService, private _router: Router) { }

  ngOnInit() {
    $("body").addClass("authentication sidebar-collapse");
    $(".navbar-toggler").on('click',function() {
      $("html").toggleClass("nav-open");
    });

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });
  }

  onSubmit() {
    const email = "hyeonsik5015@gmail.com";
    const password = "aodgh1928!";

    this.auth.signIn(email, password).subscribe((data) => {
      this._router.navigateByUrl('/');
      alert(JSON.stringify(data));
    }, (err)=> {
      alert(JSON.stringify(err));
      //this.emailVerificationMessage = true;
    });   
  }

  
}

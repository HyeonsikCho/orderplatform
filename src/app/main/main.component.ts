import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../authentication/authorization.service";
import {Http, Headers} from "@angular/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bAuthenticated = false;
  _data : any;

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
    var authenticatedUser = this.auth.getAuthenticatedUser();

    if (authenticatedUser == null) {
      return;
    }
    

    this.bAuthenticated = true;

    authenticatedUser.getSession( (err, session) => {
      const token = session.getIdToken().getJwtToken();  
      console.log(token);    
      alert(token);    
    });
  }

  apiTest() {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    authenticatedUser.getSession( (err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      
      authenticatedUser.getSession( (err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        const token = session.getIdToken().getJwtToken();      
        const headers = new Headers();
        headers.append('Authorization', token);      
        var that = this;
        this.auth.getAuthenticatedUser().getSession((err, session) => {
          if (err) {
            console.log(err);
            return;
          }
          const token = session.getIdToken().getJwtToken();        
          const headers = new Headers();
          console.log(token);    
          alert(token);  
          headers.append('Authorization', token);        
          this.http.get('https://bpxmjwpjgj.execute-api.ap-northeast-2.amazonaws.com/prod/get-template', { headers: headers })
            .subscribe(
            response => {           
              that._data = response.json();
            },
            error => {
              console.log(error);
            }
          );
        });
      });
    });
  }
}

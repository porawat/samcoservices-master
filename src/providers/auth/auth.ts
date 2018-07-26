import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  pass: any;
  eid: any;
  emname: any;
  constructor(private http: Http) {
    console.log('Hello AuthProvider Provider');
  }
  public logout() {
    return Observable.create(observer => {
      // this.currentUser = null;
      localStorage.clear();
      observer.next(true);
      observer.complete();
    });
  }
  public login(credentials) {
    
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.ServerURL() + 'ws_login.php', credentials)
        .subscribe(
          res => {
            const req = res.json();
            console.log(req);
            if (req.results === 'success_login') {
              // localStorage.setItem('USER', JSON.stringify(req));
              localStorage.setItem('USER', JSON.stringify(req));
              this.pass = req.Pass;
              this.eid = req.Userid;
              this.emname = req.Emp_Name;
              console.log(this.eid);
              let access = (credentials.User_ID === this.eid && credentials.Pass_ID === this.pass);
              //this.currentUser = new User(this.eid, this.emname);
              observer.next(access);
              observer.complete();
            }

          },
          err => {
            //     console.log('Error occured');
            return Observable.throw("Please insert credentials");
          });

    });
 
  }
  public ServerURL() {
    return 'http://119.160.221.164/store-request/webservices/';
  }
}

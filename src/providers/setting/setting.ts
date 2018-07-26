
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from '../auth/auth';

/*
  Generated class for the SettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingProvider {

  constructor(private http: Http,
    public auth: AuthProvider) {
   // console.log('Hello SettingProvider Provider');
  }
 
  public powsetting(item) {
   // console.log(item);
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'powsetting.php', item)
        .subscribe(
          res => {
            const req = res.json();
          // console.log(req);
            if (req.results === 'success') {
             observer.next(req.datarow);
             observer.complete();
            }

          },
          err => {
            //     console.log('Error occured');
            return Observable.throw("Please insert credentials");
          });

    });
 
  }
  public savepoint(items){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'powsavesetting.php', items)
        .subscribe(
          res => {
            const req = res.json();
            console.log(req);
            
            if (req.results === 'success') {
             observer.next(req.datarow);
             observer.complete();
            }

          },
          err => {
            //     console.log('Error occured');
            return Observable.throw("Please insert credentials");
          });

    });
  }
  public delpoint(items){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'pow_delpoint.php', items)
        .subscribe(
          res => {
            const req = res.json();
            console.log(req);
            if (req.results === 'success') {
             observer.next(req.datarow);
             observer.complete();
            }

          },
          err => {
            //     console.log('Error occured');
            return Observable.throw("Please insert credentials");
          });

    });
  }
  public kaset(items){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'pow_setka.php', items)
        .subscribe(
          res => {
            const req = res.json();
            console.log(req);
            if (req.results === 'success') {
             observer.next(req.datarow);
             observer.complete();
            }

          },
          err => {
            //     console.log('Error occured');
            return Observable.throw("Please insert credentials");
          });

    });
  }
}

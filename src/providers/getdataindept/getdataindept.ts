import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from '../auth/auth';

/*
  Generated class for the GetdataindeptProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetdataindeptProvider {

  constructor(
    private http: Http,
    public auth: AuthProvider) {
    console.log('Hello GetdataindeptProvider Provider');
  }



  public GetAssetDept(items){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'pow_getassetdept.php', items)
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
  public GetKa(items){
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      this.http.post(this.auth.ServerURL() + 'pow_getka.php', items)
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

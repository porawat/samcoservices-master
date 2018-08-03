
import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AutocompleteServiceProvider implements AutoCompleteService {
  user: any = JSON.parse(localStorage.getItem('USER'));
  labelAttribute = "name"; 
 // formValueAttribute = "";//ค่าออกมาเป็น object
  constructor(private http: Http) {
    console.log(this.user);
  }
  getResults(keyword: string) {
    return this.http.get("http://119.160.221.164/store-request/webservices/pow_search_emppoint.php?keyword=" + keyword + "&Dept_ID=" + this.user.Dept_ID)
      .map(
        result => {

          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()))

        });
  }
}

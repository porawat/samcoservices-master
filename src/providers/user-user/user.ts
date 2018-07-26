
import 'rxjs/add/operator/map';



/*
  Generated class for the UserUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User {
  name: string;
  password: string;
 
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}
export class UserProvider {
  currentUser : User;
  pass:any;
  eid:any;
  emname:any;
  constructor() {
    console.log('Hello UserUserProvider Provider');
  }
  
  public ServerURL() {
    return 'http://119.160.221.164/store-request/webservices/';
  }
}

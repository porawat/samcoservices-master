import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {TutorialPage}from '../tutorial/tutorial';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dir: string = 'ltr';
 
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private storage: Storage,
    public auth: AuthProvider) {
     
   
      this.dir = platform.dir();
  }
  ngOnInit() {
    this.storage.get("USER").then(login => {
      if (login && login.Userid === "") {
        this.navCtrl.setRoot(LoginPage);
      // console.log(login);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //  console.log(this.user);
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  startact(){
    this.navCtrl.setRoot(TutorialPage);
  }
}

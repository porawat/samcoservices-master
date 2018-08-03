import { Component } from '@angular/core';
import { NavController ,Platform} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {TutorialPage}from '../tutorial/tutorial';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dir: string = 'ltr';
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public auth: AuthProvider) {
       
      if (!this.user) {
        this.navCtrl.setRoot(LoginPage);
      }
      this.dir = platform.dir();
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

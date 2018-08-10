import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pass: any;
  eid: any;
  emname: any;
  loading: Loading;
  // registerCredentials = { name: '', password: '' };
  account: { User_ID: string, Pass_ID: string } = {
    User_ID: '',
    Pass_ID: ''
  };
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public nav: NavController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public auth: AuthProvider
  ) {
    console.log(this.user);
    if (this.user) {
      this.nav.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public login() {
    console.log(this.account);
    this.showLoading();
    if (this.account.User_ID === '' || this.account.Pass_ID === '') {
      let toast = this.toastCtrl.create({
        message: "User or Password not Empty",
        duration: 1000,
        position: 'top'
      });
      toast.present();
      this.closeLoading();
    } else {
    this.auth.login(this.account).subscribe(allowed => {
      console.log(allowed);
      if (allowed) {

        this.nav.setRoot(HomePage);
        this.closeLoading();
      }
    });
    this.closeLoading();
    }
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,

    })
    this.loading.present();
  }
  closeLoading() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  //  toast.dismiss();
  }
}

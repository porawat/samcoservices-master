import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { TakephotoPage } from '../pages/takephoto/takephoto';
import { ChartPage } from '../pages/chart/chart';
import {SignaturePage} from '../pages/signature/signature';
import {XlsxPage} from '../pages/xlsx/xlsx';
import {TutorialPage} from '../pages/tutorial/tutorial';
import { SettingPage } from '../pages/setting/setting';
import { CheckpointPage } from '../pages/checkpoint/checkpoint';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;//TutorialPage;//SignaturePage;//CheckpointPage;//LoginPage; //;//TutorialPage;
  


  
  pages: Array<{color:any,icon:any,title: string, component: any}>;
  public alertShown:boolean = false;
  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation
  
  ) {
  
    this.initializeApp();
    //console.log(this.platform.platforms());
    if(this.platform.is('android')){
      console.log('android');
      this.pages = [
        // { color:'primary',icon:'ios-home',title: 'Home', component: HomePage },
        // { color:'secondary',icon:'ios-list',title: 'List', component: ListPage },
        // { color:'danger',icon:'ios-camera',title: 'Takephoto', component: TakephotoPage },
        { color:'myblue', icon:'pie',title: 'Charts', component: ChartPage },
        // { color:'dark',icon:'ios-create',title: 'Sign', component: SignaturePage },
        { color:'dark',icon:'md-cog',title: 'Setting', component: SettingPage },
        { color:'primary',icon:'ios-create',title: 'ตรวจงาน', component: TutorialPage },
        // { color:'mygreen',icon:'md-locate',title: 'Checkpoint', component: CheckpointPage },
       
      ];
    }else{
      console.log('not android');
      this.pages = [
        { color:'primary',icon:'ios-home',title: 'Home', component: HomePage },
        { color:'secondary',icon:'ios-list',title: 'List', component: ListPage },
        { color:'danger',icon:'ios-camera',title: 'Takephoto', component: TakephotoPage },
        { color:'myblue', icon:'pie',title: 'Charts', component: ChartPage },
        { color:'dark',icon:'ios-create',title: 'Sign', component: SignaturePage },
        { color:'mygreen',icon:'list-box',title: 'xls', component: XlsxPage },
        { color:'dark',icon:'md-cog',title: 'Setting', component: SettingPage },
        { color:'mygreen',icon:'md-locate',title: 'Checkpoint', component: CheckpointPage },
        { color:'dark',icon:'ios-create',title: 'ตรวจงาน', component: TutorialPage },
      ];
    }
    // used for an example of ngFor and navigation
  
    // platform.registerBackButtonAction((e) => {
    //   console.log("backPressed 1");
    // },1);
    platform.registerBackButtonAction(() => {
      if (this.alertShown==false) {
        this.presentConfirm();  
      }
    }, 0)
  

  }
 initializeApp() {
    this.platform.ready().then(() => {
     
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            if(this.platform.is('android')){
              this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
              }
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }
 
}

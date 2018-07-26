import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import { LoginPage } from '../login/login';
import { AutocompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
import {GetdataindeptProvider} from '../../providers/getdataindept/getdataindept';
export interface Slide {
  title: string;
  description: string;
  image: string;
  data:any;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  labelAttribute = "name";
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  datasasset:any;
  Kaset:any;
  ka:any;
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    public set: SettingProvider,
    public getdata:GetdataindeptProvider,
    public completeTestService : AutocompleteServiceProvider) {

      this.getdata.GetAssetDept({'Dept_ID':this.user.Dept_ID}).subscribe(res=>{
          console.log(res);
          this.datasasset=res;
         // this.navCtrl.push(PowsettingPage, res);
        })
        this.getdata.GetKa({'Dept_ID':this.user.Dept_ID}).subscribe(res=>{
          console.log('ค่าที่ได้',res);
          var num:number = res; 
          var i:number; 
          var factorial = 1; 
          var a:{};
          var b=[];
          for(i = 1;i <= num;i++) {
             a={'ka':i}
             b.push(a);
          }
          
          console.log(b);
          this.Kaset=b;
         // this.navCtrl.push(PowsettingPage, res);
        })
    this.dir = platform.dir();
   
        this.slides = [
          {
            title: 'จุดประจำการ',
            description: 'บันทึก รปภ.ประจำจุด',
            image: 'assets/img/ica-slidebox-img-1.png',
            data:this.datasasset
          },
          {
            title: 'TUTORIAL_SLIDE2_TITLE',
            description: 'TUTORIAL_SLIDE2_DESCRIPTION',
            image: 'assets/img/ica-slidebox-img-2.png',
            data:''
          },
          {
            title: 'UTORIAL_SLIDE3_TITLE',
            description: 'TUTORIAL_SLIDE3_DESCRIPTION',
            image: 'assets/img/ica-slidebox-img-3.png',
            data:''
          }
        ];
      
  }

  startApp() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  dataassetForms(){
   
    console.log(this.datasasset);
    console.log(this.ka);
  }
  KaForms(){
    console.log(this.ka);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import { PowsettingPage } from '../powsetting/powsetting';
import { KasettingPage } from '../kasetting/kasetting';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  items = [
    { id:'pows',icon: 'ios-locate', title: 'ตั้งค่าจุดประจำการณ์' ,even:'point'},
    { id:'dev',icon: 'ios-briefcase', title: 'อุปกรณ์ในหน่วยงาน',even:'device' },
    { id:'cctv',icon: 'ios-videocam', title: 'CCTV/ALARM',even:'cctv' },
    { id:'people',icon: 'md-people', title: 'ตั้งค่ากะ',even:'section' },
   
  ];
  user: any = JSON.parse(localStorage.getItem('USER'));
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public set: SettingProvider) {
    //console.log(this.user.Dept_ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  set_locate() {
    console.log('เปิดหน้า');
    
  }
  itemSelected(item:any) {
    //console.log("Selected Item", item);
    if(item.even=='point'){
      this.set.powsetting(this.user).subscribe(res=>{
      //  console.log(res);
        this.navCtrl.push(PowsettingPage, res);
      })
    }else if(item.even=='section'){
      this.navCtrl.push(KasettingPage);
    }else{
      console.log(item.even);
    }
    
  }

}

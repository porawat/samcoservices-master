import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { AutocompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
import { SettingProvider } from '../../providers/setting/setting';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the CheckpointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkpoint',
  templateUrl: 'checkpoint.html',
})
export class CheckpointPage {
  dataslides:any;
  user: any = JSON.parse(localStorage.getItem('USER'));
  singleform = {};
  name:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public set: SettingProvider,
    public platform: Platform,
    public completeTestService : AutocompleteServiceProvider,
    private screenOrientation: ScreenOrientation) {
      this.set.powsetting(this.user).subscribe(res=>{
        console.log(res);
        this.dataslides=res;
       
      })
     // console.log(platform);
      if(this.platform.is('android')){
        console.log(this.screenOrientation.type);
        this.screenOrientation.unlock();
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
   
  }
 
  ionViewDidLoad() {
    if(this.platform.is('android')){
  this.screenOrientation.unlock();
    }
  }
  ionViewDidLeave(){
    if(this.platform.is('android')){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
  logForms(x){
    console.log(this.dataslides);
    console.log(x);
  }
}

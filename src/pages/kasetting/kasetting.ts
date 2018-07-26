import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the KasettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kasetting',
  templateUrl: 'kasetting.html',
})
export class KasettingPage {
  user: any = JSON.parse(localStorage.getItem('USER'));
  todo :any;
    items:any;
  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public set: SettingProvider) {
  }

  ionViewDidLoad() {
    console.log(this.user);
  }
  optionsFn(x){
    console.log(x);
  }
  logForms(x) {
  if(!this.todo){
    let toast = this.toastCtrl.create({
          message: 'ค่าต้องไม่ว่าง',
          duration: 1000,
          position: 'top'
        });
        toast.present();
  }else{
    console.log(this.todo);
    let post = {'Dept_ID':this.user.Dept_ID,'ka':this.todo};
    this.set.kaset(post).subscribe(allowed => {
     // console.log(allowed);
      let toast = this.toastCtrl.create({
        message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
        duration: 1000,
        position: 'top',
        cssClass: "toast-success"
      });
      toast.present();
      this.items=allowed;
    },
      error => {
        let toast = this.toastCtrl.create({
          message: "Access Denied",
          duration: 1000,
          position: 'top'
        });
        toast.present();
      //  this.closeLoading();
      });
  }
    

   
  }
  resetform(){
    this.todo.ka='';
  }
}

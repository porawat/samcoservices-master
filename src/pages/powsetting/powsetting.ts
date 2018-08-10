import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Platform} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';

/**
 * Generated class for the PowsettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-powsetting',
  templateUrl: 'powsetting.html',
})
export class PowsettingPage {
  user: any = JSON.parse(localStorage.getItem('USER'));
 items:any;
 todos = [];
 todo = {
   Point_id:'',
   Point_set:'',
   Point_name:''};
   public alertShown:boolean = false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtrl: ToastController,
     public set: SettingProvider,
     public platform: Platform, 
     public alertCtrl: AlertController
     ) {
       this.items=navParams.data;
       if(this.platform.is('android')){
         
       }
       
  }

  ionViewDidLoad() {
    console.log('PowsettingPage');
  }
  itemSelected(item: any) {
   // console.log("Selected Item", item);
    this.todo=item;
  }
 
  logForms() {
  
    // console.log(this.todo.Point_id ==='');
     if (this.todo.Point_set === '' || this.todo.Point_name===''){
      // console.log('เติมค่า');
       let toast = this.toastCtrl.create({
        message: 'ค่าต้องไม่ว่าง',
        duration: 1000,
        position: 'top'
      });
      toast.present();
     }else{
      this.items.push(this.todo);
      console.log(this.items);
      this.todo={
        Point_id:'',
        Point_set:'',
        Point_name:''
      };
     }
   
  }
  resetform(){
    this.todo={
      Point_id:'',
      Point_set:'',
      Point_name:''
    };
  }
  delpoint(item){
    console.log(item);
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'จุด '+item.Point_name,
      cssClass: 'alertCustomCss',
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
            console.log(item);
            let postdata = [{'user':this.user,'item':item}];
            //=============================start
            this.set.delpoint(postdata).subscribe(allowed => {
              console.log(allowed);
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
           // this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }
  saveall(){
   // console.log('allowed');
    let post = [{'user':this.user,'points':this.items}];
    this.set.savepoint(post).subscribe(allowed => {
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

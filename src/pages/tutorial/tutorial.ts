import { Component} from '@angular/core';
import { IonicPage, MenuController,Modal,ModalController, NavController,NavParams, Platform ,PopoverController } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AutocompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
import {GetdataindeptProvider} from '../../providers/getdataindept/getdataindept';
import { DatePicker } from '@ionic-native/date-picker';
import { SignaturePage } from '../signature/signature';
import {SettingPage} from '../setting/setting';
import { HomePage } from '../../pages/home/home';
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
  user: any = JSON.parse(localStorage.getItem('USER'));
  labelAttribute = "name";
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  datasasset:any;
  Kaset:any;
  ka:any;
  Pid:any;
  showDate:any;
  showbecuce:any;
  showdvr:any;
  showAlarm:any;
  showbuild:any;
  showoutbuild:any;
  buildingtitle:any;
  showdatebutton:any;
  selectedday:any;
  selectedyear:any;
  month=[];
  year=[];
  selectedmont:any;
  securoom={CCTV:'1',DVR:'1',ALARM:'1',INbuilding:'1',OUTbuilding:'1',BUZZER:'1'};
  KASHOW=false;
  dataslides:any;
  singleform = {};
  name:any;
  datarow:any;
  signature:any;
  signatureImage:any;
  
  constructor(public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    public set: SettingProvider,
    public getdata:GetdataindeptProvider,
    public nav: NavController,
    private modal:ModalController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private datePicker: DatePicker,
    public popoverCtrl: PopoverController,
    public completeTestService : AutocompleteServiceProvider) {
      
      var   user: any = JSON.parse(localStorage.getItem('USER'));
      
     this.signature = this.navParams.data.signature;
  
      if (!user) {
        this.nav.setRoot(LoginPage);
      }else{
        this.set.powsetting(user).subscribe(res=>{
        //  console.log(res);
          this.dataslides=res;
         
        });
        if(this.platform.is('android')){
            this.showdatebutton=true;
        }else{
          this.showdatebutton=false;
          this.year=[
            {yid:'2018',ylabel:'2018'},
            {yid:'2019',ylabel:'2019'},
            {yid:'2020',ylabel:'2020'}
          ];
          this.month=[
            {mid:'01',mlabel:'มกราคม'},
            {mid:'02',mlabel:'กุมภาพันธ์'},
            {mid:'03',mlabel:'มีนาคม'},
            {mid:'04',mlabel:'เมษายน'},
            {mid:'05',mlabel:'พฤษภาคม'},
            {mid:'06',mlabel:'มิถุนายน'},
            {mid:'07',mlabel:'กรกฎาคม'},
            {mid:'08',mlabel:'สิงหาคม'},
            {mid:'09',mlabel:'กันยายน'},
            {mid:'10',mlabel:'ตุลาคม'},
            {mid:'11',mlabel:'พฤศจิกายน'},
            {mid:'12',mlabel:'ธันวาคม'},];     
    var  d =   new Date();
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
           //   console.log(day,month,year);
           this.selectedday=day;
           this.selectedmont=month;
           this.selectedyear=""+year+"";

          // this.ka='1'; //เลือก กะ
                  
        this.Pid=this.selectedday+this.selectedmont+this.selectedyear;
        const data = {
          Dept_ID:this.user.Dept_ID,
          day:this.selectedday,
          Pid:this.selectedmont+this.selectedyear
        }
        this.getdata.checkKa(data).subscribe(res=>{
        //     console.log(res.row);
             this.datarow=res.datarow;
            // this.navCtrl.push(PowsettingPage, res);
            if(res.row===0){
              this.KASHOW=false;
              this.ka='1';
            }else{
              this.KASHOW=true;
              if(res.row===1){
                this.ka='2';
              }
             
            }
           })
        }

        this.showbecuce=false;
        this.showdvr=false;
        this.showAlarm=false;
        this.showbuild=false;
        this.showoutbuild=false;
        this.getdata.GetAssetDept({Dept_ID:user.Dept_ID}).subscribe(res=>{
       //   console.log(res);
          this.datasasset=res;
         // this.navCtrl.push(PowsettingPage, res);
        })
        this.getdata.GetKa({Dept_ID:user.Dept_ID}).subscribe(res=>{
         // console.log('ค่าที่ได้',res);
          var num:number = res; 
          var i:number; 
          var a:{};
          var b=[];
          for(i = 1;i <= num;i++) {
             a={'ka':i}
             b.push(a);
          }
          
        //  console.log(b);
          this.Kaset=b;
         // this.navCtrl.push(PowsettingPage, res);
        })
    this.dir = platform.dir();
      }
   
        
  }
  changeday(x){
   // console.log(x);
    this.selectedmont+this.selectedyear;
    const data = {
      Dept_ID:this.user.Dept_ID,
      day:x,
      Pid:this.selectedmont+this.selectedyear
    }
    this.getdata.checkKa(data).subscribe(res=>{
        // console.log(res.row);
         this.datarow=res.datarow;
        // this.navCtrl.push(PowsettingPage, res);
        if(res.row===0){
          this.KASHOW=false;
          this.ka='1';
        }else{
          this.KASHOW=true;
          if(res.row===1){
            this.ka='2';
          }
         
        }
       })
  }
  selectdate(){
   // let dateNow2 ;
    
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
    //    console.log('Got date: ', date);
       // dateNow=date.toLocaleDateString();
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year  = date.getFullYear();
        console.log(day,month,year);
      //  if(splitted[1].length==1){
      //   dateNow2='0'+splitted[1];
      //  }else{
      //   dateNow2=splitted[1];
//       //  }
this.showDate =  day+'-'+month+'-'+''+year;
this.Pid=day+''+month+''+year;
//console.log(this.Pid);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  startApp() {
    this.navCtrl.setRoot(SettingPage, {}, {
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
let newid:any=null;
    if(!this.ka){
      let toast = this.toastCtrl.create({
        message: 'คุณยังไม่ได้เลือกกะ',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
      // console.log(this.datasasset);
      // console.log(this.ka);
      // console.log(this.dataslides);
      // console.log(this.securoom);
      // console.log(this.user);

      if(!this.Pid){
        newid=this.ka+this.selectedday+this.selectedmont+this.selectedyear;
      }else{
        newid=this.ka+this.Pid;
      }  
  //    console.log(newid);

            let items = {
              'user':this.user,
              'KA':this.ka,
              'securoom':this.securoom,
              'secucheck':this.datasasset,
              'Pointsetup':this.dataslides,
              'signsuper':this.signature,
              'Pid':newid
             };
             this.set.dairycheck(items).subscribe(allowed => {
               console.log(allowed);
               let toast = this.toastCtrl.create({
                 message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                 duration: 3000,
                 position: 'top',
                 cssClass: "toast-success"
               });
               toast.present();
               this.nav.setRoot(HomePage);
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
  KaForms(){
  //  console.log(this.ka);
  }
  getval(x){
    if(x===1){
      this.showbecuce=false;
    }else{
      this.showbecuce=true;
    }
  //  console.log(this.securoom);
  }
  setDvr(x){
    if(x===1){
      this.showdvr=false;
    }else{
      this.showdvr=true;
    }
   // console.log(this.securoom);
  }
  setAlarm(x){
    if(x===1){
      this.showAlarm=false;
    }else{
      this.showAlarm=true;
    }
   // console.log(this.securoom);
  }
  buildcheck(x){
    if(x===1){
      this.showbuild=false;
    }else{
      this.showbuild=true;
    }
  //  console.log(this.securoom);
  }
  outbuildcheck(x){
    if(x===1){
      this.showoutbuild=false;
    }else{
      this.showoutbuild=true;
    }
 //   console.log(this.securoom);
  }
  modelsigh(myEvent){
  console.log(myEvent);
const supersign={
  name:'super'
}
 const myModal: Modal =  this.modal.create(SignaturePage,{data:supersign});
 myModal.present();
 myModal.onDidDismiss((data)=>{
  console.log('1');
   this.signature=data.signature;
 })
 myModal.onWillDismiss((data)=>{
  console.log('2');
  console.log(data);
 })

  /*
    let popover = this.popoverCtrl.create(SignaturePage,{},{cssClass:'popover'});
    popover.present({
      ev: myEvent      
    });
     */
  }
 

}

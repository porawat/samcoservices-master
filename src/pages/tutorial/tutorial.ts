import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { SettingProvider } from '../../providers/setting/setting';
import { LoginPage } from '../login/login';
import { AutocompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
import {GetdataindeptProvider} from '../../providers/getdataindept/getdataindept';
import { DatePicker } from '@ionic-native/date-picker';
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
  securoom={cctv:'1',DVR:'1',Alarm:'1',INbuilding:'1',OUTbuilding:'1',outbuildingtitle:''};
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(public navCtrl: NavController, 
    
    public menu: MenuController, 
    public platform: Platform,
    public set: SettingProvider,
    public getdata:GetdataindeptProvider,
    public nav: NavController,
    private datePicker: DatePicker,
    public completeTestService : AutocompleteServiceProvider) {

      if (!this.user) {
        this.nav.setRoot(LoginPage);
      }else{

        if(this.platform.is('android')){
            this.showdatebutton=true;
        }else{
          this.showdatebutton=false;
          this.year=[
            {yid:'2561',ylabel:'2561'},
            {yid:'2562',ylabel:'2562'},
            {yid:'2563',ylabel:'2563'}
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


      
      let splitted;
      let cmont ;
            
      splitted =   new Date().toLocaleDateString().split("/", 3);
              console.log(splitted);
             
if(splitted[1].length==1){
  cmont='0'+splitted[1];
}else{
  cmont=splitted[1];
}
            this.selectedmont=cmont;

            this.selectedday=splitted[0];
            this.selectedyear=splitted[2];
            //this.selectedmont.mlabel='2';
        }

        this.showbecuce=false;
        this.showdvr=false;
        this.showAlarm=false;
        this.showbuild=false;
        this.showoutbuild=false;
        this.securoom.outbuildingtitle='';
        this.getdata.GetAssetDept({Dept_ID:this.user.Dept_ID}).subscribe(res=>{
          console.log(res);
          this.datasasset=res;
         // this.navCtrl.push(PowsettingPage, res);
        })
        this.getdata.GetKa({Dept_ID:this.user.Dept_ID}).subscribe(res=>{
          console.log('ค่าที่ได้',res);
          var num:number = res; 
          var i:number; 
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

        
  }
  selectdate(){
    let dateNow2 ;
    
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date.toLocaleString());
       // dateNow=date.toLocaleDateString();
        var splitted = date.toLocaleDateString().split("/", 3);
        console.log(splitted);
       if(splitted[1].length==1){
        dateNow2='0'+splitted[1];
       }else{
        dateNow2=splitted[1];
       }
this.showDate =  splitted[0]+'-'+dateNow2+'-'+splitted[2];
this.Pid=splitted[0]+dateNow2+splitted[2];
console.log(this.Pid);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
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
    
    if(!this.Pid){
      console.log('Pid='+this.ka+this.selectedday+this.selectedmont+this.selectedyear);
    }else{
      console.log('Pid='+this.ka+this.Pid);
    }
    
  }
  KaForms(){
    console.log(this.ka);
  }
  getval(x){
    if(x===1){
      this.showbecuce=false;
    }else{
      this.showbecuce=true;
    }
    console.log(this.securoom);
  }
  setDvr(x){
    if(x===1){
      this.showdvr=false;
    }else{
      this.showdvr=true;
    }
    console.log(this.securoom);
  }
  setAlarm(x){
    if(x===1){
      this.showAlarm=false;
    }else{
      this.showAlarm=true;
    }
    console.log(this.securoom);
  }
  buildcheck(x){
    if(x===1){
      this.showbuild=false;
    }else{
      this.showbuild=true;
    }
    console.log(this.securoom);
  }
  outbuildcheck(x){
    if(x===1){
      this.showoutbuild=false;
      this.securoom.outbuildingtitle = '';
    }else{
      this.showoutbuild=true;
    }
    console.log(this.securoom);
  }
}

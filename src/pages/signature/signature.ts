import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the SignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})

export class SignaturePage {
  signature = '';
  isDrawing = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: any;
  Width: any;
  Height: any;
 
  public signatureImage: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private screenOrientation: ScreenOrientation,
    public toastCtrl: ToastController) {
    if (this.platform.is('android')) {
     // console.log(this.screenOrientation.type);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); 
     // console.log(this.screenOrientation.type);
      
       if(platform.width()>platform.height()){
        this.Width=platform.width() * 80 / 100;
        this.Height=platform.height() * 45 / 100;
       }else{
        this.Width=platform.height() * 45 / 100; 
        this.Height=platform.width() * 80 / 100;
       }
    // console.log(this.Width,this.Height)

     this.signaturePadOptions = {
      'minWidth': 2,
      'canvasWidth': this.Width,
      'canvasHeight': this.Height,
      'penColor': 'red'
    }
      }



     else {
      this.signaturePadOptions = {
        'minWidth': 2,
        'canvasWidth': platform.width() * 80 / 100,
        'canvasHeight': platform.height() * 50 / 100,
        'penColor': 'red'
      }
    }
    // this.signaturePadOptions;
    console.log('Width: ' + platform.width());
    console.log('Height: ' + platform.height());
  }

  ionViewDidLoad() {
    if (this.platform.is('android')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }
  ionViewDidEnter() {
    if (this.platform.is('android')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.signaturePad.clear()
  }
  ionViewDidLeave() {
    if (!this.platform.is('core')){
      //device-specific code, such as detecting screen rotation
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
    console.log('ออก');
  }
  /*
  drawComplete() {
    this.isDrawing = false;
  }
  */
  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);
    this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  drawCancel() {
    // this.navCtrl.push(HomePage);
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    // this.navCtrl.push(HomePage, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }

}

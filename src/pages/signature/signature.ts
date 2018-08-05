import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ToastController } from 'ionic-angular';



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
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {
    if (this.platform.is('android')) {
     this.signaturePadOptions = {
      'minWidth': 2,
      'canvasWidth':Math.ceil(platform.width()*80/100),
      'canvasHeight': Math.ceil(platform.height()*45/100),
      'penColor': 'red',
     
    }
      } else {
      this.signaturePadOptions = {
        'minWidth': 2,
        'canvasWidth': 600,
        'canvasHeight': 400 ,
        'penColor': 'red',       
      }
    }
    // this.signaturePadOptions;
  console.log('Width: ' + platform.width());
  console.log('Height: ' + platform.height());
  }

  ionViewDidLoad() {
    // if (this.platform.is('android')) {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); 
    // }
  }
  ionViewDidEnter() {
    // if (this.platform.is('android')) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); 
    //   }
    this.signaturePad.clear()
  }
  ionViewDidLeave() {
    // if (this.platform.is('android')) {
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); 
    //   }
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
    if(this.signaturePad.isEmpty()){
      let toast = this.toastCtrl.create({
        message: 'กรุณาเซ็นด้วยครับ !!!',
        duration: 1000,
        position: 'top'
      });
      toast.present();
    }else{
      this.signatureImage = this.signaturePad.toDataURL();

 const data={
    signature:this.signaturePad.toDataURL()
   }

   this.viewCtrl.dismiss(data);
//  this.viewCtrl.dismiss(data);
//        let toast = this.toastCtrl.create({
//          message: 'New Signature saved.',
//          duration: 1000,
//          position: 'top'
//        });
//        toast.present();
//        this.viewCtrl.dismiss();
//        this.navCtrl.setRoot(TutorialPage,{signature:this.signaturePad.toDataURL()});
    }
   
   
  // window.location.reload();
  }

  drawCancel() {
    this.viewCtrl.dismiss();
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

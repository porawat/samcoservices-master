import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the TakephotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-takephoto',
  templateUrl: 'takephoto.html',
})
export class TakephotoPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public camera: Camera) {
      this.form = formBuilder.group({
        profilePic: [''],
        name: ['', Validators.required],
        about: ['']
      });

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
     
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TakephotoPage');
  }
  getPicture() {
    const options: CameraOptions = {
      quality: 80,
      //destinationType: this.camera.DestinationType.FILE_URI,//call file
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      targetWidth: 96,
      targetHeight: 96
    }
    // {
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   targetWidth: 96,
    //   targetHeight: 96
    // }
    if (Camera['installed']()) {
      this.camera.getPicture(options).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
       // alert('Unable to take photo');
        this.camera.getPicture({
          sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE}).then((data) => {
          this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
          console.log()
        })
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.form.reset();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    //this.viewCtrl.dismiss(this.form.value);
    console.log(this.form.value);
  }
}

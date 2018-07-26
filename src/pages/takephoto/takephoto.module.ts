import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakephotoPage } from './takephoto';

@NgModule({
  declarations: [
    TakephotoPage,
  ],
  imports: [
    IonicPageModule.forChild(TakephotoPage),
  ],
})
export class TakephotoPageModule {}

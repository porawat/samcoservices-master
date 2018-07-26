import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { XlsxPage } from './xlsx';

@NgModule({
  declarations: [
    XlsxPage,
  ],
  imports: [
    IonicPageModule.forChild(XlsxPage),
  ],
})
export class XlsxPageModule {}

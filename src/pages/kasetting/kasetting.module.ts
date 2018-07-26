import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KasettingPage } from './kasetting';

@NgModule({
  declarations: [
    KasettingPage,
  ],
  imports: [
    IonicPageModule.forChild(KasettingPage),
  ],
})
export class KasettingPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesOfferPage } from './services-offer';

@NgModule({
  declarations: [
    ServicesOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesOfferPage),
  ],
})
export class ServicesOfferPageModule {}

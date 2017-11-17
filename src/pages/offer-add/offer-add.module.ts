import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferAddPage } from './offer-add';

@NgModule({
  declarations: [
    OfferAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferAddPage),
  ],
})
export class OfferAddPageModule {}

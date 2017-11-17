import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificClientPage } from './specific-client';

@NgModule({
  declarations: [
    SpecificClientPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificClientPage),
  ],
})
export class SpecificClientPageModule {}

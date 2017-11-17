import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewLeaveDetailsPage } from './view-leave-details';

@NgModule({
  declarations: [
    ViewLeaveDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewLeaveDetailsPage),
  ],
})
export class ViewLeaveDetailsPageModule {}

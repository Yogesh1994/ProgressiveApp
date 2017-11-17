import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeLeavePage } from './employee-leave';

@NgModule({
  declarations: [
    EmployeeLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeLeavePage),
  ],
})
export class EmployeeLeavePageModule {}

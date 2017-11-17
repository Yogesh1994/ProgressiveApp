import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceReportPage } from './invoice-report';

@NgModule({
  declarations: [
    InvoiceReportPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceReportPage),
  ],
})
export class InvoiceReportPageModule {}

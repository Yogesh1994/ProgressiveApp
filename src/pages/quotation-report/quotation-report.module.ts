import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationReportPage } from './quotation-report';

@NgModule({
  declarations: [
    QuotationReportPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationReportPage),
  ],
})
export class QuotationReportPageModule {}

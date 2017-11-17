import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationInvoicePage } from './quotation-invoice';

@NgModule({
  declarations: [
    QuotationInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationInvoicePage),
  ],
})
export class QuotationInvoicePageModule {}

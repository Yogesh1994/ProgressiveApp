import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotationInvoicePreviewPage } from './quotation-invoice-preview';

@NgModule({
  declarations: [
    QuotationInvoicePreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotationInvoicePreviewPage),
  ],
})
export class QuotationInvoicePreviewPageModule {}

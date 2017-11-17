import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx'; 
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-quotation-report',
  templateUrl: 'quotation-report.html',
})
export class QuotationReportPage {

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {}
  userform = new FormGroup({
    selectPeriod: new FormControl('', [Validators.required]),
  })
  onSubmit() {
    let period = this.userform.value;
    let periodType = period.selectPeriod;
    let userEmail: any;
    this.storage.get('userData').then((val) => {
      userEmail = val.email;
      console.log(periodType);
      let link = "http://www.progressiveit.in/progressive_app/quotationReportMail.php?period=" + periodType + "&email=" + userEmail + "";
      this.http.get(link)
        .map(res => res.json()).subscribe((data) => {
          console.log(data);
          console.log(link);
          if (data.server_response == 'true') {
            let toast = this.toastCtrl.create({
              message: 'Quotation Report Sent On Mail',
              duration: 2000,
              position: 'bottom'
            });
            toast.present(toast);
          } else {
            let toast = this.toastCtrl.create({
              message: 'Mail Not sent. Something Went wrong',
              duration: 2000,
              position: 'bottom'
            });
            toast.present(toast);
          }
        });
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotationReportPage');
  }

}


import { Component,} from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams, Events } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  isLogin: any;
  MyPic: any;
  QI: any;
  quotation: any;
  quotation_ref: any;
  singleQuote: any;
  constructor(public storage: Storage, public events: Events, public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {
    this.QI = "Invoice";
    console.log("HEddasLOO BRo", this.QI);
    this.getQuotationRef();
  }

  userform = new FormGroup({

    pen_number: new FormControl(),
    salutation: new FormControl('', [Validators.required]),
    company_name: new FormControl(' ', [Validators.required, Validators.minLength(4)]),
    client_name: new FormControl(' ', [Validators.required, Validators.minLength(4)]),
    address_line1: new FormControl(' ', [Validators.required]),
    address_line2: new FormControl(' ', [Validators.required]),
    address_line3: new FormControl(' ', [Validators.required]),
    contact_no: new FormControl(' ', [Validators.pattern('^[1-9][0-9]{9}$'), Validators.required]),
    email: new FormControl('', [Validators.email]),

  })

  getQuotationRef() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      this.http.get("http://www.progressiveit.in/progressive_app/quotation_ref.php").map(res => res.json()).subscribe((data) => {
        this.quotation = data.data;
      });
      loading.dismiss();
    }, 1000);


  }


  onSubmit(type) {
    if (type == 'Invoice') {
      let data = this.userform.value;
      let quotation_ref = this.quotation_ref;
      console.log(JSON.stringify({
        data,
        quotation_ref
      }));

      this.navCtrl.push('QuotationInvoiceAddMorePage', {
        type,
        data,
        quotation_ref
      });
    }
    // else if(type=='Quotation')
    // {
    //    let data=this.userform.value;
    //      console.log(JSON.stringify({data}));

    //   this.navCtrl.push('QuotationInvoiceAddMorePage',{type,data});
    // }
    else {
      console.log("Extra", this.userform.value);
    }

  }


  onChange(deviceValue) {
    this.singleQuote = this.quotation.filter(
      data => data.ref === deviceValue);
      this.quotation_ref = deviceValue;
    this.userform.controls['pen_number'].setValue(this.singleQuote[0].PAN_no);
    this.userform.controls['salutation'].setValue(this.singleQuote[0].gender);
    this.userform.controls['client_name'].setValue(this.singleQuote[0].client_name);
    this.userform.controls['company_name'].setValue(this.singleQuote[0].client_company_name);
    this.userform.controls['contact_no'].setValue(this.singleQuote[0].client_number);
    this.userform.controls['email'].setValue(this.singleQuote[0].client_email);



  }
  login() {
    this.navCtrl.push('LoginPage');

  }
  ionViewCanEnter() {
    this.isLogin = "No";
    this.storage.get('userData').then((val) => {


      if (!val) {
        this.isLogin = "No";
      } else {
        this.isLogin = "Yes";

        this.MyPic = val.profilePic;
      }

    });



    this.events.subscribe('isLogin', (val) => {
      this.isLogin = val;
    });
    console.log("Invoice Page");
  }

}


import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams, Events } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-quotation-invoice',
  templateUrl: 'quotation-invoice.html',
})
export class QuotationInvoicePage {
  isLogin: any;
  MyPic: any;
  QI: any;
  quotation: any;
  quotation_ref: any;
  constructor(public storage: Storage, public events: Events, public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {
    this.QI = this.navparam.get("QI");
    console.log("HELsasaOO BRo", this.QI);
    this.getQuotationRef();
  }

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
  userform = new FormGroup({
    // name: new FormControl(null,[Validators.required,Validators.minLength(4)]),

    // email:new FormControl(null,[Validators.email,Validators.required]),

    // mobile:new FormControl(null,[Validators.pattern('^[1-9][0-9]{9}$'),Validators.required]),

    // requirment: new FormControl(null,[Validators.required,Validators.minLength(10)]),

    // service_name: new FormControl(null,[Validators.required]),
    // year:new FormControl(null),
    // month:new FormControl(null),
    // amc_services: new FormControl(null),
    pen_number: new FormControl(''),
    salutation: new FormControl('', [Validators.required]),
    company_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    client_name: new FormControl(' ', [Validators.required, Validators.minLength(4)]),
    address_line1: new FormControl(' ', [Validators.required]),
    address_line2: new FormControl(' ', [Validators.required]),
    address_line3: new FormControl(' ', [Validators.required]),
    contact_no: new FormControl(' ', [Validators.pattern('^[1-9][0-9]{9}$'), Validators.required]),
    email: new FormControl('', [Validators.email]),






  })
  onSubmit(type) {
   
    if (type == 'Quotation') {
      let data = this.userform.value;
      //let quotation_ref = this.quotation_ref;

      //    let quotation_ref=this.quotation_ref;
      console.log(JSON.stringify({
        data
      }));
      //console.log("ikade",JSON.stringify({quotation_ref}));    
      this.navCtrl.push('QuotationInvoiceAddMorePage', {
        type,
        data
      });
    } else {
      console.log("Extra", this.userform.value);
    }

  }

  onChange(deviceValue) {
    console.log(deviceValue);
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
    console.log("QuotationInvoice Page");
  }

}


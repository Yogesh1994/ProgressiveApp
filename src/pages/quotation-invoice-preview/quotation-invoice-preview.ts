import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,AlertController,ToastController,NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-quotation-invoice-preview',
  templateUrl: 'quotation-invoice-preview.html',
   styles:[`
   input.ng-invalid {border-left:5px solid red;}
   input.ng-valid { border-left:5px solid #0099DC;}
  `]
})
export class QuotationInvoicePreviewPage {
  isLogin: any;
  userName: any;
  QI: any;
  data: any;
  type: any;
  submitData: any;
  datamore: any;
  todayDate: any;
  ref: any;
  date: any;

  phaseTr: any;
  particular: any;
  total: any;
  quotation_ref: any;
  QI_Data;
  names: any = [];
  services: any = [];
  productTypeArray: any = [];
  Navinarray: any = [];
  constructor(public alertCtrl: AlertController, public storage: Storage, public events: Events,
    public navCtrl: NavController, public loadingCtrl: LoadingController,
    public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {

    this.services = ['Domain/Hosting', 'Website/SSL/IP', 'Android/iOS APP', 'Marketing', 'Custom App/Web'];
    this.type = this.navparam.get("type");


    this.data = this.navparam.get("data");


    this.datamore = this.navparam.get("datamore");
    this.quotation_ref = this.navparam.get("quotation_ref");
    console.log("quotation ref", this.quotation_ref);

    this.particular = this.datamore.Particulars;

    for (let i = 0; i < this.services.length; i++) {
      for (let j = 0; j < this.particular.length; j++) {
        if (this.particular[j].productType == this.services[i]) {
          //console.log("ALA MAnya alla",this.Navinarray.service[i] );
          // console.log(!this.Navinarray.includes(this.services[i]));
          if (!this.Navinarray.includes(this.services[i])) {
            // console.log("true");
            this.Navinarray.push(this.services[i]);
          }
          this.productTypeArray.push({
            "data": this.particular[j],
            "service": this.services[i]
          });
        }
      }

    }
    //console.log("LALALOPEZ", this.productTypeArray);
    // console.log("PAPAPoLEZ",  this.Navinarray);
    var total = 0;
    for (var i = 0; i < this.datamore.Particulars.length; i++) {
      total = total + this.datamore.Particulars[i].cost;
    }

    this.total = total;
    for (var j = 0; j < this.datamore.Phase.length; j++) {
      this.phaseTr = "hiiii";
    }


  }

  getref() {
    this.http.get("http://www.progressiveit.in/progressive_app/ref.php").map(res => res.json()).subscribe((data) => {
      if (this.quotation_ref == null) {
        this.ref = data.data[0].ref;
      } else {
        this.ref = this.quotation_ref;
      }

      this.date = data.data[0].date;

    });
  }


  sendMail() {


    for (var i = 0; i < this.datamore.Particulars.length; i++) {
      //console.log(this.datamore.Particulars[i]);
    }

    let type = this.type;
    let currentDate = this.date;
    let ref = this.ref;
    console.log("Hello", ref);
    let gender = this.data.salutation;
    let client_name = this.data.client_name;
    let client_company = this.data.company_name;
    let contact_no = this.data.contact_no;
    let client_email = this.data.email;
    let address = this.data.address_line1 + "," + this.data.address_line2 + ',' + this.data.address_line3;
    let sales_person = this.userName;
    console.log(sales_person, "hello");
    let PAN_no = this.data.pen_number;
    let quotation_ref = this.quotation_ref;
    let particular = this.datamore.Particulars;
    let prodType = this.Navinarray;
    let productArray = this.productTypeArray;
    let phaseArray = this.datamore.Phase;
    let data = JSON.stringify({
      type,
      currentDate,
      ref,
      gender,
      client_name,
      contact_no,
      client_company,
      client_email,
      address,
      sales_person,
      PAN_no,
      particular,
      prodType,
      productArray,
      phaseArray
    });
    console.log("data array is", data);
    let link = "";
    if (type == "Quotation") {
      link = "http://www.progressiveit.in/progressive_app/quotation_mail.php";
    } else {
      link = "http://www.progressiveit.in/progressive_app/invoice_mail.php";
    }

    //console.log("ikadacha data",data);
    let loading = this.loadingCtrl.create({
      content: 'Sending ' + this.type + '...'
    });

    loading.present();

    setTimeout(() => {
      this.http.post(link, data).map(res => res.json()).subscribe((data) => {
        let alert = this.alertCtrl.create({
          title: this.type + ' sent!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
              this.navCtrl.pop();
              //this.navCtrl.pop();
              //this.navCtrl.pop();
            }
          }]
        });
        alert.present();
        loading.dismiss();
      });

    });

  }


  login() {
    this.navCtrl.push("LoginPage");

  }
  ionViewCanEnter() {
    this.getref();
    this.isLogin = "No";
    this.storage.get('userData').then((val) => {


      if (!val) {
        this.isLogin = "No";
      } else {
        this.isLogin = "Yes";

        this.userName = val.name;
        console.log(this.userName, "name");
      }

    });
    this.events.subscribe('isLogin', (val) => {
      this.isLogin = val;
    });
    //console.log("QuotationInvoicePreview Page");
  }


}


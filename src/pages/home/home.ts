import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { Http } from "@angular/http";
import "rxjs/Rx";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isLogin: any;
  // MyPic:any;
  value: any;
  constructor(public http: Http, public menu: MenuController, public popoverCtrl: PopoverController, public navCtrl: NavController, public storage: Storage, public events: Events) {
    menu.enable(true);

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create("PopoverPage", {
      cssClass: 'popover'
    });
    popover.present({
      ev: myEvent
    });
  }

  ///////////////////////////
  // sendMail()
  //   {



  //         let data=JSON.stringify({"type":"Invoice","currentDate":"16.10.2017","ref":"100717#3","gender":"Mr.","client_name":"Yogesh Gadade","client_company":"Progressive Interactive Pvt Ltd","client_email":"yogesh@progressiveit.in","address":"Address Adress addre,Address Adress addre,Address 400008 ","PAN_no":"qwertyu12345678","particular":[{"tenure":"One Time","particular":"Android Application","productType":"Android/iOS APP","cost":65000},{"tenure":"1 Year","particular":"iOS Application","productType":"Android/iOS APP","cost":75000}],"prodType":["Android/iOS APP"],"productArray":[{"data":{"tenure":"One Time","particular":"Android Application","productType":"Android/iOS APP","cost":65000},"service":"Android/iOS APP"},{"data":{"tenure":"1 Year","particular":"iOS Application","productType":"Android/iOS APP","cost":75000},"service":"Android/iOS APP"}],"phaseArray":[{"desc":" this is for 1st month","phaseRate":40},{"desc":" this is for 2nd month","phaseRate":60}]});
  //         console.log("data array is",data);
  //         let link="";

  //             link="http://www.progressiveit.in/progressive_app/invoice_mail.php";



  //                   this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{

  //           console.log("data ala");
  //            });

  //           }
  //////////////////////////



  GotoPage(page) {
    if (page == 'ListPage') {
      this.navCtrl.push('ListPage');
    } else if (page == 'about') {
      this.navCtrl.push('AboutPage');
    } else if (page == 'team') {
      this.navCtrl.push('TeamPage');
    } else if (page == 'RegisterPage') {
      this.navCtrl.push('RegisterPage');
    } else if (page == 'contact') {
      this.navCtrl.push('ContactPage');
    } else if (page == 'services') {
      this.navCtrl.push('ServicesPage');
    } else if (page == 'offers') {
      this.navCtrl.push('OffersPage');
    } else if (page == 'careers') {
      this.navCtrl.push('CareerPage');
    } else if (page == 'InvoicePage') {
      this.navCtrl.push('InvoicePage');
    } else if (page == 'InvoiceReportPage') {
      this.navCtrl.push('InvoiceReportPage');
    } else if (page == 'QuotationReportPage') {
      this.navCtrl.push('QuotationReportPage');
    } else if (page == 'LeaveList') {
      this.storage.get('userType').then((val) => {
        if (val == 'A')
          this.navCtrl.push('LeaveListPage');
        else
          this.navCtrl.push('EmployeeLeavePage');
      });

    }

  }

  QuotationInvoice(QI) {
    this.navCtrl.push('QuotationInvoicePage', {
      QI
    });
    console.log(QI);
  }
  ionViewCanEnter() {

    //this.isLogin="No";
    this.storage.get('userData').then((val) => {
      if (val == '' || val == null || val == '') {
        this.events.subscribe('isLogin', val => {
          this.isLogin = val;
          this.value = "U";
        })
        console.log("Storage is not present");
      } else {

        if (!val) {
          this.isLogin = "No";
        } else {


          this.isLogin = "Yes";
          //this.MyPic=val.profilePic;
          this.value = val.type;
        }
      }

    });

    console.log("home Page");
  }
}


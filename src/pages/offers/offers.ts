import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  isLogin: any;
  MyPic: any;
  LoginType: any;
  offerList: any;
  constructor(public storage: Storage, public events: Events, public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {

  }

  login() {
    this.navCtrl.push('LoginPage');

  }
  ionViewCanEnter() {
    this.getOfferList();
    this.isLogin = "No";
    this.storage.get('userData').then((val) => {


      if (!val) {
        this.isLogin = "No";
        this.LoginType = "";
      } else {
        this.isLogin = "Yes";

        this.MyPic = val.profilePic;

        this.LoginType = val.type;
      }

    });



    this.events.subscribe('isLogin', (val) => {
      this.isLogin = val;
    });
    console.log("Offer Page");
  }


  getOfferList() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      let link = "http://www.progressiveit.in/progressive_app/offer.php";
      let post = "select";
      let data = JSON.stringify({
        post
      });
      this.http.post(link, data).map(res => res.json()).subscribe((data) => {
        this.offerList = data.data;
        console.log(this.offerList);
      });
      loading.dismiss();
    }, 2000);


  }
  ContactPage() {
    this.navCtrl.push('ContactPage')
  }
  offerAdd() {
    this.navCtrl.push('OfferAddPage');
  }

}


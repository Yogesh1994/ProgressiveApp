import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
isLogin:any;
MyPic:any;
  constructor(public storage:Storage,public events:Events,public navCtrl: NavController,public loadingCtrl:LoadingController,public http:Http,public toastCtrl:ToastController,public navparam:NavParams) {
 
  }

   login()
  {
    this.navCtrl.push('LoginPage');
    
  }
   ionViewCanEnter()
  {
    this.isLogin="No";
    this.storage.get('userData').then((val)=>{

      
      if(!val)
      {
        this.isLogin="No";
      }
      else
      {
        this.isLogin="Yes";

        this.MyPic=val.profilePic;
      }
      
    });

    

    this.events.subscribe('isLogin', (val) => {
        this.isLogin=val;
    });
    console.log("Services Page");
  }

  servicesOffer(service)
  {
      this.navCtrl.push("ServicesOfferPage",{service});
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController,NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-offer-add',
  templateUrl: 'offer-add.html',
})
export class OfferAddPage {

 isLogin:any;
MyPic:any;
 LoginType:any;
 saveStatus:any;
 title:any;
 offer:any;
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
        this.LoginType="";
      }
      else
      {
        this.isLogin="Yes";

        this.MyPic=val.profilePic;

        this.LoginType=val.type;
      }
      
    });

    

    this.events.subscribe('isLogin', (val) => {
        this.isLogin=val;
    });
    console.log("offerAdd Page");
  }

  
  getOfferList()
  {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => 
      {
        let link="http://www.progressiveit.in/progressive_app/offer.php";
        let post="insert";
        let title=this.title;
        let offer=this.offer;
        let data=JSON.stringify({post,title,offer});
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>
        {
        this.saveStatus=data.data;
        this.presentToast("Offer Save Successfully");
        this.title="";
        this.offer="";
        });
        loading.dismiss();
      }, 2000);
    

  }

  presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}

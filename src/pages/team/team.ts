import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';


import 'rxjs/Rx';

import {Events} from 'ionic-angular';

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
team_data:any;
  isLogin:any;
  MyPic:any;
  constructor(public navCtrl: NavController,public storage:Storage,
  public loadingCtrl:LoadingController,public http:Http,public toastCtrl:ToastController,public navparam:NavParams,public events:Events) 
  {
    storage.get("teamData").then((val)=>{
      if(!val)
      {
        this.fetchProgressiveTeam();
      }
      else
      {
        this.team_data=val
        console.log(this.team_data);
      }
    })
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
    console.log("Team Page");
  }
  

  fetchProgressiveTeam()
  {
    let link='http://www.progressiveit.in/progressive_app/progressive_team.php';
    this.http.get(link).map(res=>res.json()).subscribe(data=>{
        this.team_data=data.data;
        this.storage.set("teamData",this.team_data);
        console.log(this.team_data);
    });
    
  }
  GotoEmployeePage(data)
  {
      this.navCtrl.push('EmployeeDetailsPage',{data});
  }
  Toast(message)
  {
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

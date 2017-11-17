import { Component } from '@angular/core';
import { NavController,ToastController,IonicPage,MenuController } from 'ionic-angular';
import {Http} from '@angular/http';
import {HomePage} from '../home/home';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
username:any;
password:any;
data:any;
  constructor(public menu:MenuController, public navCtrl: NavController,public http:Http,public toastCtrl:ToastController,public storage:Storage,public events:Events) {
  this.data={};
  this.data.username="";
  this.data.password="";
  menu.enable(true);
  }

// register(){
//   this.navCtrl.push("RegisterPage");
// }
login()
{

    let username=this.data.username;
    let password=this.data.password;
    let data=JSON.stringify({username,password}); 
    console.log("LOGINDATA",data);
    if(username=="" || password=="")
    {
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }
    else
    {  
    let link = "http://www.progressiveit.in/progressive_app/login.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
    console.log(data.res);
     if(data.res[0].code=='true')
     {
       let toast = this.toastCtrl.create({
        message: 'Login Successfull',
        duration: 2000,
        position: 'bottom'
        });
        toast.present(toast);
        
       // this.navCtrl.push(HomePage);
       //   this.navCtrl.pop();
         console.log(data.res[0]);

        this.storage.set('userData',data.res[0]);
        this.storage.set('userType',data.res[0].type);
               this.navCtrl.setRoot(HomePage);

        this.events.publish('isLogin','Yes');
     }
     else
     {
        let toast = this.toastCtrl.create({
        message: 'Check Your Username or Password',
        duration: 2000,
        position: 'bottom'
        });
        toast.present(toast);
     }
      
    },error=>{console.log(error)});  
    
    }
}

 ionViewCanEnter()
  {
    console.log("loginmllmPage");
  }

}

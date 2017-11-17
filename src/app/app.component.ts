import { Component, ViewChild } from '@angular/core';
import { Nav ,Platform ,AlertController,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //MyPic: any;
  @ViewChild(Nav) nav: Nav
  isLogin:any;
 rootPage: any = HomePage;
  pages: Array<{img:string, title: string, component: any}>;
  constructor(platform: Platform,public events:Events,public storage:Storage, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl: AlertController) {
      // used for an example of ngFor and navigation
    this.pages = [
      { img:'img/home.png', title: 'Home', component: HomePage },
      { img:'img/about.png', title: 'About Us', component: "AboutPage" },
      { img:'img/contact.png', title: 'Contact Us', component: "ContactPage" },
      //{ title: 'Logout' , component : LoginPage}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.isLogin="No";
    this.storage.get('userData').then((val)=>{
      if(val==''||val==null||val=='')
      {
        console.log("Storage is not present" );
       //  this.rootPage=HomePage;
      }else{
        
        console.log("Storage is  present" );
              this.events.subscribe('isLogin',val=>{
                 console.log(val,"login"); 
             this.isLogin=val;
            
             
        }) 
                this.isLogin="Yes";     
                this.rootPage=HomePage;
              // this.MyPic=val.profilePic;            
      }
       
    });

    });
  }
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  login(){
    this.nav.setRoot("LoginPage");
    //this.nav.setRoot("LoginPage");
  }
logout(){
let confirm = this.alertCtrl.create({
      title: 'Confirm logout?',
      message: ' Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.storage.clear(); 
            this.isLogin="No";
            //this.MyPic="";
  //       this.nav.push("LoginPage");
    this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }
}


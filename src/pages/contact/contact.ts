import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  ToastController,
  NavParams
} from 'ionic-angular';
import {
  Http
} from '@angular/http';
import 'rxjs/Rx';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Storage
} from '@ionic/storage';
import {
  Events
} from 'ionic-angular';
import {
  LoginPage
} from '../login/login';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  styles: [`
   input.ng-invalid {border-left:5px solid red;}
   input.ng-valid { border-left:5px solid green;}
  `]
})
export class ContactPage {
  isLogin: any;
  MyPic: any;
  AMC: any;
  service_name: any;
  constructor(public storage: Storage, public events: Events, public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {
    this.AMC = "";
    this.service_name = "";
  }

  userform = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),

    email: new FormControl(null, [Validators.email, Validators.required]),

    mobile: new FormControl(null, [Validators.pattern('^[1-9][0-9]{9}$'), Validators.required]),

    requirment: new FormControl(null, [Validators.required, Validators.minLength(10)]),

    service_name: new FormControl(null, [Validators.required]),
    //year: new FormControl(null),
    //month: new FormControl(null),
    amc_services: new FormControl(null),

  })
  login() {
    this.navCtrl.push(LoginPage);

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
    console.log("contact Page");
  }

  onSubmit() {
    //console.log(this.userform.value);

    let loading = this.loadingCtrl.create({
      content: 'Please Wait....'
    });
    loading.present();
    setTimeout(() => {
      let name = this.userform.value.name;
      let email = this.userform.value.email;
      let requirment = this.userform.value.requirment;
      let mobile = this.userform.value.mobile;
      let service_name = this.userform.value.service_name;
      let year = this.userform.value.year;
      let month = this.userform.value.month;
      let amc_services = this.userform.value.amc_services;

      console.log(name, email, requirment, mobile);
      let data = JSON.stringify({
        name,
        email,
        requirment,
        mobile,
        service_name,
        year,
        month,
        amc_services
      });
      let link = "http://www.progressiveit.in/progressive_app/contactus_email.php";
      this.http.post(link, data).map(res => res.json()).subscribe(data => {
        if (data.server_response.code == 'true') {
          let toast = this.toastCtrl.create({
            message: "Enquiry details sent!",
            duration: 2000,
            position: 'top'
          });
          toast.present();

        } else {
          alert("Error");
        }
        this.userform.reset();
      });
      loading.dismiss();
    });
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}

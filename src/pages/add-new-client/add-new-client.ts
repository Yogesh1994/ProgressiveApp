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
/**
 * Generated class for the AddNewClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-client',
  templateUrl: 'add-new-client.html',
})
export class AddNewClientPage {
  response: any;
  email: any
  code: any;
  AMC: any;
  service_name: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {
    this.email = this.navparam.get("email");

    this.AMC = "";
    this.service_name = "";
  }
  userform = new FormGroup({



    project_date: new FormControl(null, Validators.required),
    service_name: new FormControl(null, [Validators.required]),
    client_name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    client_mobile: new FormControl(null, [Validators.pattern('^[1-9][0-9]{9}$'), Validators.required]),
    current_status: new FormControl({
      disabled: true
    }, Validators.required),
    total_amount: new FormControl(null, [Validators.required]),
    paid_amount: new FormControl(null, [Validators.required]),
    hosting_company: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    hosting_domain: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    hosting_expiry_date: new FormControl(null, Validators.required),

    year: new FormControl(null),
    month: new FormControl(null),
    amc_services: new FormControl(null),


  })
  onSubmit() {

    let email = this.email;
    let project_date = this.userform.value.project_date;


    let client_name = this.userform.value.client_name;
    let client_mobile = this.userform.value.client_mobile;
    let current_status = this.userform.value.current_status;

    let total_amount = this.userform.value.total_amount;
    let paid_amount = this.userform.value.paid_amount;
    let pending_amount = total_amount - paid_amount;
    let hosting_company = this.userform.value.hosting_company;

    let hosting_domain = this.userform.value.hosting_domain;
    let hosting_expiry_date = this.userform.value.hosting_expiry_date;

    let service_name = this.userform.value.service_name;
    let year = this.userform.value.year;
    let month = this.userform.value.month;
    let amc_services = this.userform.value.amc_services;

    if (total_amount < paid_amount) {
      alert("Paid Amount Can't be Greater then Total Amount");
    } else if (service_name == 'AMC' && !amc_services) {
      alert("Select Service");
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please Wait....'
      });
      loading.present();
      setTimeout(() => {
        let data = JSON.stringify({
          email,
          project_date,
          service_name,
          client_name,
          client_mobile,
          current_status,
          total_amount,
          paid_amount,
          pending_amount,
          hosting_company,
          hosting_domain,
          hosting_expiry_date,
          year,
          month,
          amc_services
        })

        let link = "http://www.progressiveit.in/progressive_app/add_new_service.php";
        console.log(data);

        this.http.post(link, data).map(res => res.json()).subscribe((data) => {
          this.code = data.data;

          this.Toast("Data Added Successfully");
          this.userform.reset();
        });
        loading.dismiss();

      });



    }


  }


  Toast(message) {
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

  ionViewCanEnter() {
    console.log("AddNewClient Page");
  }
}

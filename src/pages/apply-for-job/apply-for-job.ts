import {
  Component
} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  ToastController,
  NavParams,
  AlertController
} from 'ionic-angular';
import 'rxjs/Rx';
import {
  Http
} from '@angular/http';
import {
  Storage
} from '@ionic/storage';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-apply-for-job',
  templateUrl: 'apply-for-job.html',
})
export class ApplyForJobPage {
  // name:any;
  // email:any;
  // mobile:any;
  userForm: FormGroup;
  job_details: any;
  flag: any;
  constructor(public _form: FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController, public storage: Storage,
    public loadingCtrl: LoadingController, public http: Http, public toastCtrl: ToastController, public navparam: NavParams) {
    this.job_details = this.navparam.get('job_application');
  }

  ngOnInit() {
    this.userForm = this._form.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+@" + "[A-Za-z0-9-]+(\\.[A-Za-z]{2,})$")]],
      user_mobile: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{9}$")]],
      user_current_salary: [''],
      user_type: ['', [Validators.required]],
      comment: [''],
      user_total_experiance: ['']
    })
  }

  onSubmit() {
    //console.log(this.userForm.value.user_name);
    let user_name = this.userForm.value.user_name;
    let user_email = this.userForm.value.user_email;
    let user_mobile = this.userForm.value.user_mobile;
    let user_current_salary = this.userForm.value.user_current_salary;
    let comment = this.userForm.value.comment;
    let user_total_experiance = this.userForm.value.user_total_experiance;
    let user_type = this.userForm.value.user_type;
    let job_id = this.job_details.id;
    let job_position = this.job_details.job_position;

    let alert = this.alertCtrl.create({
      title: 'Confirm Apply',
      message: 'Do you want to apply job?',
      buttons: [{
          text: 'Not now',
          role: 'cancel'
        },
        {
          text: 'Apply',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Applying...'
            });

            loading.present();
            let link = "http://www.progressiveit.in/progressive_app/apply_job_insert.php";
            let data = JSON.stringify({
              user_name,
              user_email,
              user_mobile,
              user_current_salary,
              comment,
              user_total_experiance,
              user_type,
              job_id,
              job_position
            });
            console.log("data", data);
            this.http.post(link, data).map(res => res.json()).subscribe((data) => {

              if (data.server_response == 'applied') {
                let toast = this.toastCtrl.create({
                  message: 'Alerady applied to this job!',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                loading.dismiss();
                this.navCtrl.pop();
              } else if (data.server_response == 'true') {
                let toast = this.toastCtrl.create({
                  message: 'Applied Successfully!',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                loading.dismiss();
                this.navCtrl.pop();
              }

            });
          }
        }
      ]
    });
    alert.present();
  }


  //    ionViewCanEnter(){
  //    this.storage.get('userData').then((val)=>{
  //         this.name=val.name;
  //         this.email = val.email;
  //         this.mobile = val.mobile;
  //     });
  //     }
  apply(user_details) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyForJobPage');
  }
  onChange(myevent) {
    this.flag = myevent;
    console.log("alla", myevent);
  }
}

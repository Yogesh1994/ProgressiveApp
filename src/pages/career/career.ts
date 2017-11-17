import {
  Component,
  OnInit
} from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  Http
} from '@angular/http';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-career',
  templateUrl: 'career.html',
})
export class CareerPage implements OnInit {
  flag: any;
  openings_array: Array < any >= [];
  constructor(public toastCtrl: ToastController, public http: Http, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {}

  ngOnInit() {
    let link = "http://www.progressiveit.in/progressive_app/get_job.php";
    this.http.get(link).map(res => res.json()).subscribe((data) => {
      if (data.code == 'true') {
        this.openings_array = data.server_response;
        this.flag = true;
      } else {
        this.flag = false;
      }

    });
  }
  apply_job(job_application) {
    this.navCtrl.push('ApplyForJobPage', {
      "job_application": job_application
    });
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams} from 'ionic-angular';
import 'rxjs/Rx';
@IonicPage()
@Component({
  selector: 'page-employee-details',
  templateUrl: 'employee-details.html',
})
export class EmployeeDetailsPage {
  team_data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team_data = this.navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailsPage');
  }

}


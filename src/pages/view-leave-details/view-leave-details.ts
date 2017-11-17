import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-view-leave-details',
  templateUrl: 'view-leave-details.html',
})
export class ViewLeaveDetailsPage {

    id:any;
emp_name:any;
subject:any;
desc:any;
from:any;
to:any;
status:any;
rej_desc:any;
fetch:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.id=this.navParams.get("id");
    this.emp_name=this.navParams.get("emp_name");
    this.subject=this.navParams.get("subject");
    this.desc=this.navParams.get("desc");
    this.from=this.navParams.get("from");
    this.to=this.navParams.get("to");
    this.status=this.navParams.get("status");
    this.rej_desc=this.navParams.get("rej_desc");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewLeaveDetailsPage');
  }
    Accept(){
        let id=this.id;
        let send_data=JSON.stringify({id});
        console.log(send_data);
        let link="http://www.progressiveit.in/progressive_app/leave_accept.php";
                this.http.post(link,send_data).map(res=>res.json()).subscribe(data=>{
            this.fetch=data.server_response;
            // console.log(this.fetch);

            });
            this.navCtrl.pop();
        }

        Reject(){
        let emp_name=this.emp_name;
        let id=this.id;
        this.navCtrl.push("LeaveRejectPage",{id,emp_name});
        }

}

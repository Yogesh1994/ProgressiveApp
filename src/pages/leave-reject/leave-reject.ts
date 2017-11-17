import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-leave-reject',
  templateUrl: 'leave-reject.html',
})
export class LeaveRejectPage {
emp_name:any;
rej_desc:any;
id:any;
data:any
fetch:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.data={};
    this.id=this.navParams.get("id");
    this.data.emp_name=this.navParams.get("emp_name");
    this.data.rej_desc="";
  }

  ionViewDidLoad() {
    
  }
  rej_desc_send()
  {
    let id=this.id;
   // let emp_name=this.data.emp_name;
    let rej_desc=this.data.rej_desc;
 
  let send_data=JSON.stringify({id,rej_desc});
  let link="http://www.progressiveit.in/progressive_app/leave_reject.php";
          this.http.post(link,send_data).map(res=>res.json()).subscribe(data=>{
      this.fetch=data.server_response;
  	});
    this.navCtrl.popTo( this.navCtrl.getByIndex(1));
    this.navCtrl.popTo("LeaveListPage");
  }
}

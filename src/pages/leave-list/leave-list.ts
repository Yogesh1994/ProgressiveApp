import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the LeaveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-list',
  templateUrl: 'leave-list.html',
})
export class LeaveListPage {
fetch:any;
code1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ViewLeavePage');
  }
ionViewCanEnter(){
  let link="http://www.progressiveit.in/progressive_app/leave_view.php";
          this.http.get(link).map(res=>res.json()).subscribe(data=>{
      this.fetch=data.server_response;
      console.log(this.fetch);
      let code=this.fetch[0].code;
      this.code1=code;

  	});
}
viewLeaveEmp(id,emp_name,subject,desc,from,to,status,rej_desc)
{

  this.navCtrl.push('ViewLeaveDetailsPage',{id,emp_name,subject,desc,from,to,status,rej_desc});
}

}

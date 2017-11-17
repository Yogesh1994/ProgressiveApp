import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-specific-client',
  templateUrl: 'specific-client.html',
})
export class SpecificClientPage {
    project_details:any;
  constructor(public toastCtrl:ToastController,public http:Http, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
  }

   ngOnInit()
    {
         let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            }); 
            loading.present();
          
           this.project_details = this.navParams.get('project_details');
            setTimeout(() => {
                loading.dismiss();
            });
      
       //console.log(this.project_details);
    }
    update(NewClientData)
    {
        let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            }); 
            loading.present();
          
            let link="http://www.progressiveit.in/progressive_app/update_client_data.php";
            let data=JSON.stringify({"project_id":NewClientData.project_id,"project_date":NewClientData.project_date,"project_service_name":NewClientData.project_service_name,
                              "client_name":NewClientData.client_name,"amc_services":NewClientData.amc_services,"client_mobile":NewClientData.client_mobile,
                              "current_status":NewClientData.current_status,"hosting_company":NewClientData.hosting_company,"hosting_doman":NewClientData.hosting_doman,
                              "hosting_expiry":NewClientData.hosting_expiry,"month":NewClientData.month,"paid_amount":NewClientData.paid_amount,"paid_amount_date":NewClientData.paid_amount_date,
                              "pending_amount":NewClientData.pending_amount,"total_amount":NewClientData.total_amount,"user_email":NewClientData.user_email,
                              "year":NewClientData.year});
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                 if(data.server_response.code=='true')
                 {
                    let toast = this.toastCtrl.create({
                        message: 'Details Updated',
                        duration: 3000,
                        position: 'bottom'
                    });
                       this.ngOnInit();
                    toast.present();
                 }
            });
            setTimeout(() => {
                loading.dismiss();
            });
                      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecificClientPage');
  }

}

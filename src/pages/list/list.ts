import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
 userType:any;
  email:any;
  clientData=Array<string>();
  flag:any;
  constructor(public loadingCtrl:LoadingController, public http:Http, public navCtrl: NavController, public navParams: NavParams,public events:Events,public storage:Storage) 
  {
    
   
  }

  ngOnInit()
{

     this.storage.get('userData').then((val)=>
    {
    //   if(val.type=='A'){ 
    //     this.userType = 'A';
    //   }
    // else{
    //     this.userType = 'Other';
    //   }
     if(!val || val==null || val==undefined || val=='')
      {
         this.userType = 'Other';
      }
      else
      {
          if(val.type=='A'){ 
          this.userType = 'A';
          }
          else{
            this.userType = 'Other';
          }    
      }

      // if(!val || val==null || val==undefined || val=='')
      // {
      //     console.log("not");
      //   this.isLogin="No";
      // }
      // else
      // {
      //     console.log("yes");
      //   this.isLogin="Yes";
      //   this.email=val.email;
      // }
      
    });
    let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            }); 
            loading.present();
             let link="http://www.progressiveit.in/progressive_app/get_client_data.php";
             this.http.get(link).map(res=>res.json()).subscribe((data)=>{
             if(data.code=='true')
            {
               this.flag=true;
               this.clientData=data.server_response;
             }else{
                 this.flag=false;
                 this.clientData= data.server_response;
              } 
           });
          
            setTimeout(() => {
                loading.dismiss();
            });
  
}

OpenClient(SpecificClientData)
{
    this.navCtrl.push('SpecificClientPage',{"project_details":SpecificClientData})
}
  ionViewCanEnter()
  {
    console.log("list  Page aal");
  }
  
  AddNewClient()
  {
    let email=this.email;
    this.navCtrl.push('AddNewClientPage',{email})
  }

}

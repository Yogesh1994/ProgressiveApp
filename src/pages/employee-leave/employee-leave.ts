import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Http} from '@angular/http';
import { IonicPage, NavController ,LoadingController,ToastController} from 'ionic-angular';
import 'rxjs/Rx';
 

@IonicPage()
@Component({
  selector: 'page-employee-leave',
  templateUrl: 'employee-leave.html',
})
export class EmployeeLeavePage {

UserForm : FormGroup;
constructor(private navCtrl:NavController, private toastCtrl: ToastController,private _form : FormBuilder,public http:Http,private loadingCtrl:LoadingController ){}

ngOnInit()
{
    this.UserForm = this._form.group({
                name:[' ',Validators.required],
                subject:[' ',Validators.required],
                description:[' ',[Validators.required,Validators.minLength(10)]],
                fromDate:[' ',Validators.required],
                ToDate:[' ',Validators.required]
            });
}

submitform()
{


        let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            }); 
            loading.present();

                  let name=this.UserForm.value.name;
                  let subject=this.UserForm.value.subject;
                  let desc= this.UserForm.value.description;
                    let from=this.UserForm.value.FromDate;
                    let to=this.UserForm.value.ToDate;
                
                    let data = JSON.stringify({name,subject,desc,from,to});
                    let link = "http://www.progressiveit.in//progressive_app/leave_insert.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                            
                    if(data.server_response[0].code=='true')
                        {
                            let toast = this.toastCtrl.create({
                            message: 'Leave Application has been sent!',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                        }
                            loading.dismiss();
                          this.navCtrl.pop();  
                    });
          
          
}

}

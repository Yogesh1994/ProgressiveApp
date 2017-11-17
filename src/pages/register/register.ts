import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styles:[`
   input.ng-invalid {border-left:5px solid red;}
   input.ng-valid { border-left:5px solid green;}
  `]
})
export class RegisterPage {
response:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public http:Http,public toastCtrl:ToastController) {
  }
userform = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(4)]),
    
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required),
    cpassword:new FormControl(null,[,Validators.required]),

    mobile:new FormControl(null,[Validators.pattern('^[1-9][0-9]{9}$'),Validators.required]),
   
  })

  
 onSubmit(){
    //console.log(this.userform.value);
if(this.userform.value.password!=this.userform.value.cpassword){
const toast = this.toastCtrl.create({
    message: 'Password Mismatch',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}
else{

  let loading=this.loadingCtrl.create
  ({
      content:'Please Wait....'
  });
  loading.present();
  setTimeout(()=>{
  let name=this.userform.value.name;
  let email=this.userform.value.email;
  let password=this.userform.value.password;
  let mobile =this.userform.value.mobile;
  
  
console.log(name,email,password,mobile);
  let data=JSON.stringify({name,email,password,mobile});
  let link="http://www.progressiveit.in/progressive_app/register.php";
 this.http.post(link,data).map(res=>res.json()).subscribe(data=>{
 this.response=data.res;
           console.log("value1",this.response)
           if(this.response.code=="true")
          {
            
          let toast = this.toastCtrl.create({
            message: 'Registered Successfully',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
           this.navCtrl.push("LoginPage");
          }
          else if(this.response.code=="user_exists"){
             let toast = this.toastCtrl.create({
            message: 'User Already Exist',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
            
          }
 });
   loading.dismiss();
  });
 }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}

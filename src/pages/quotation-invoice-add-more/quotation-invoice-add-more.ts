import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController,ToastController,NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {FormGroup,Validators,FormArray, FormBuilder,  } from '@angular/forms';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-quotation-invoice-add-more',
  templateUrl: 'quotation-invoice-add-more.html',
  styles:[`
   input.ng-invalid {border-left:5px solid red;}
   input.ng-valid { border-left:5px solid #0099DC;}
  `]
})
export class QuotationInvoiceAddMorePage implements OnInit{

isLogin:any;
MyPic:any;
QI:any;
data:any;
type:any;
quotation_ref:any;
language:Array<string>;
public myForm: FormGroup;




  constructor(public storage:Storage,public events:Events,
  public navCtrl: NavController,public loadingCtrl:LoadingController,private _fb: FormBuilder,
  public http:Http,public toastCtrl:ToastController,public navparam:NavParams) 
  {     
       
   


      this.type=this.navparam.get("type");
      console.log(this.type);

      this.data=this.navparam.get("data");
      console.log(this.data);

      this.quotation_ref=this.navparam.get("quotation_ref");
      console.log(this.quotation_ref);

      this.language=[];
    
  }







  // address
      ngOnInit() {
        this.myForm = this._fb.group({
           // name: ['', [Validators.required, Validators.minLength(1)]],
            Particulars: this._fb.array([
                this.initAddress(),
            ]),
            Phase: this._fb.array([
                this.initPhase(),
            ])
        });
    }

    initAddress() {
        return this._fb.group({
           
            tenure: [''],
             particular: [' ', [Validators.required]],
            productType: [' ', [Validators.required]],
            cost: [''],
            
            
        });
    } 
    initPhase(){
        console.log("ASPP");
        return this._fb.group({
        desc:[''],
        phaseRate:['']
           
            });
    }
 
    addAddress() 
    {
        console.log(this.myForm.controls['Particulars']);
        const control = <FormArray>this.myForm.controls['Particulars'];
        control.push(this.initAddress());
        
    }
    addPhase() 
    {
 
        const control = <FormArray>this.myForm.controls['Phase'];
        control.push(this.initPhase());
        
    }
    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['Particulars'];
        control.removeAt(i);
        this.language.splice(i,1);      
    }
    removePhase(j: number) {
        const control = <FormArray>this.myForm.controls['Phase'];
        control.removeAt(j);
        this.language.splice(j,1);      
    }

    save() 
    {
        let type=this.type;
        let data=this.data;
        let quotation_ref=this.quotation_ref;
        let datamore=this.myForm.value;
        console.log(type,data,datamore,quotation_ref);
      this.navCtrl.push("QuotationInvoicePreviewPage",{type,data,datamore,quotation_ref});
    }
  
  

    preview()
    {
        
    }
  
 

   login()
  {
    this.navCtrl.push("LoginPage");
    
  }
   ionViewCanEnter()
  {
    this.isLogin="No";
    this.storage.get('userData').then((val)=>{

      
      if(!val)
      {
        this.isLogin="No";
      }
      else
      {
        this.isLogin="Yes";

        this.MyPic=val.profilePic;
      }
      
    });

    

    this.events.subscribe('isLogin', (val) => {
        this.isLogin=val;
    });
    console.log("QuotationInvoiceAddMore Page");
  }
  

 
 
}

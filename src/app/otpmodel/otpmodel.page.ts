import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otpmodel',
  templateUrl: './otpmodel.page.html',
  styleUrls: ['./otpmodel.page.scss'],
})
export class OtpmodelPage implements OnInit {

  @Input() mobile: string;



  otpForm:FormGroup;
  constructor( public formBuilder: FormBuilder ,private router:  Router,private service:AuthService,public modalController: ModalController) {
    this.otpForm = formBuilder.group({
      otp: ['', [Validators.required]]

    });
   }
map:any;
   otpSubmit(){

// this.otpForm.setValue({ mobilekey:this.mobile });
this.map={mobile:this.mobile,otp:this.otpForm.value.otp};
this.service.verifyOtp(this.map);
// console.log(this.otpForm.value);
    //  console.log(this.map);
    this.closer()
   }

   async closer()
   {
     await this.modalController.dismiss();
   }

  ngOnInit() {
  }
}

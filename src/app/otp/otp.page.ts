import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import {AuthService} from '../auth.service'

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import {OtpmodelPage} from '../otpmodel/otpmodel.page'
import { OtpPageModule } from './otp.module';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  isSubmitted=true;
  mobileLogin:FormGroup;
  constructor(public formBuilder: FormBuilder,private service:AuthService,public modalController: ModalController,public alertController: AlertController ) {
    this.mobileLogin=formBuilder.group({
      mobileno: ['', [Validators.required, Validators.pattern('(0/91)?[7-9][0-9]{9}')]]
      // otp: ['', [Validators.required, Validators.minLength(4)]]

    });


  }

  get errorControl() {
    return this.mobileLogin.controls;
  }




  onSubmit() {
    this.isSubmitted = true;
    if (!this.mobileLogin.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.service.reg(this.mobileLogin);
      this.showModal()
      // this.presentAlertPrompt()

      console.log(this.mobileLogin.value)
      //this.router.navigateByUrl('login');
    }
  }

  async showModal(){
    const modal=await this.modalController.create({
      component:OtpmodelPage,
      componentProps:{
        'mobile': this.mobileLogin.value.mobileno,

      },
      cssClass:'half-modal'
    })
    await modal.present();

    modal.onDidDismiss()
    .then((res: any) => alert(JSON.stringify(res)))
    }




  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: OtpmodelPage,
  //     cssClass: 'my-custom-class',
  //     componentProps: {
  //       'mobile': this.mobileLogin.value.mobileno,

  //     }

  //   });
  //   return await modal.present();
  // }

  // async presentAlertPrompt() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Otp !',
  //     inputs: [
  //       {
  //         name: 'name1',
  //         type: 'text',
  //         placeholder: 'Enter Otp '
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }



  ngOnInit() {
  }

}

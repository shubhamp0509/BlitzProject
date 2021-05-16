import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpmodelPageRoutingModule } from './otpmodel-routing.module';

import { OtpmodelPage } from './otpmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpmodelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OtpmodelPage]
})
export class OtpmodelPageModule {}

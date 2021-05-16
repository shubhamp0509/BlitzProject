import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpmodelPage } from './otpmodel.page';

const routes: Routes = [
  {
    path: '',
    component: OtpmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpmodelPageRoutingModule {}

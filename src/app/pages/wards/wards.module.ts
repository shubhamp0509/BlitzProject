import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WardsPageRoutingModule } from './wards-routing.module';

import { WardsPage } from './wards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WardsPageRoutingModule
  ],
  declarations: [WardsPage]
})
export class WardsPageModule {}

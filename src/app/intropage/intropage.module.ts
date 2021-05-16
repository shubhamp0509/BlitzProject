import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntropagePageRoutingModule } from './intropage-routing.module';

import { IntropagePage } from './intropage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntropagePageRoutingModule
  ],
  declarations: [IntropagePage]
})
export class IntropagePageModule {}

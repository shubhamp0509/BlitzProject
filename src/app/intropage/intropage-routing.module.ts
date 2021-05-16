import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntropagePage } from './intropage.page';

const routes: Routes = [
  {
    path: '',
    component: IntropagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntropagePageRoutingModule {}

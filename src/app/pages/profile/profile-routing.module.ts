import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import {MemberListPage} from '../member-list/member-list.page'

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  // {
  //   path: 'member-list',
  //   component: MemberListPage
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}

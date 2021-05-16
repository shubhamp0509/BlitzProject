import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AuthGuard } from "../../auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path:'wards',
        loadChildren: () => import('../wards/wards.module').then( m => m.WardsPageModule),
        canActivate:[AuthGuard]
      },

      // {
      //   path:'menu/profilepage',
      //   loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
      //   // canActivate:[AuthGuard]
      // },
      // {
      //   path: '/:mobile/profilepage',
      //   loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
      //   canActivate:[AuthGuard]
      // },

      {
        path: '',
        redirectTo: 'wards',
        pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

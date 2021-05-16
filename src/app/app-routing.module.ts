import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { AuthGuard } from "./auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component"

const routes: Routes = [
  { path: '', redirectTo: 'intropage', pathMatch: 'full' },

  // { path: 'register', component: RegisterComponent },
  // { path: 'profile/:email', component: UserProfileComponent },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    // canActivate:[AuthGuard]

  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'menu/:mobile',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'menu/:mobile/profilepage',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuard]
  },
  // {
  //   path: 'menu/:mobile/member-list',
  //   loadChildren: () => import('./pages/member-list/member-list.module').then( m => m.MemberListPageModule),
  //   // canActivate:[AuthGuard]
  // },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },


  // {
  //   path: 'menu/:email/login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },

  {
    path: 'otpmodel',
    loadChildren: () => import('./otpmodel/otpmodel.module').then( m => m.OtpmodelPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'add-member',
    loadChildren: () => import('./pages/add-member/add-member.module').then( m => m.AddMemberPageModule)
  },
  {
    path: 'menu/:mobile/member-list',
    loadChildren: () => import('./pages/member-list/member-list.module').then( m => m.MemberListPageModule)
  },
  {
    path: 'intropage',
    loadChildren: () => import('./intropage/intropage.module').then( m => m.IntropagePageModule)
  },
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'},




  // {
  //   path: 'user.ts',
  //   loadChildren: () => import('./src/app/user.ts/user.ts.module').then( m => m.User.TsPageModule)
  // },
  // {
  //   path: 'user.ts',
  //   loadChildren: () => import('./user.ts/user.ts.module').then( m => m.User.TsPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

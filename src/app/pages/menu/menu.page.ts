import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import {AddMemberPage} from '../add-member/add-member.page'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath='';

  profileName:String;
  userEmail:String;

  currentUser: any = {};
  isRegistred:boolean;
  mobile:any;

  constructor(private router:Router,public authService: AuthService,private activatedRoute: ActivatedRoute ,private modalController: ModalController ) {
    this.router.events.subscribe((event:RouterEvent)=>{
if(event && event.url){
this.selectedPath=event.url;
}
    })

    let mobile = this.activatedRoute.snapshot.paramMap.get('mobile');
    console.log(typeof(mobile))
    this.mobile=mobile;



    this.authService.getProfile(mobile).subscribe(res => {
      console.log(res);
      this.currentUser = res;
      console.log(this.currentUser.isRegistered);
      this.isRegistred=this.currentUser.isRegistered;

       this.profileName=this.currentUser.fName;
       this.userEmail=this.currentUser.email;
    })


   }

  //  constructor(public authService: AuthService,private activatedRoute: ActivatedRoute) {
  //   let email = this.activatedRoute.snapshot.paramMap.get('email');


  //   this.authService.getUserProfile(email).subscribe(res => {
  //     this.currentUser = res;
  //     //console.log("Current User"+this.currentUser);
  //     console.log(this.currentUser);
  //     this.profileName=this.currentUser.fName;
  //   })


  //  }

  profileForward(){
    console.log('/' + this.mobile+"/profilepage")

    this.router.navigate(['/menu/' + this.mobile+"/profilepage"]);
  }

  addMember(){
    console.log("Add member");
    this.presentModal();
  }
  async presentModal() {

    console.log(this.mobile)


    const modal = await this.modalController.create({

      component: AddMemberPage,
      cssClass: 'my-custom-class',
      componentProps: {
       'mobile':this.mobile

      }
    });
    return await modal.present();
  }



  ngOnInit() {
  }

  refreash(){
    window.location.reload()
  }

}

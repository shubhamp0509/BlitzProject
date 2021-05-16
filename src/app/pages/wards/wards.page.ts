import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {RegistrationPage} from '../registration/registration.page'
import { AuthService } from '../../auth.service';
import { ActivatedRoute, RouterEvent,Router } from '@angular/router';


@Component({
  selector: 'app-wards',
  templateUrl: './wards.page.html',
  styleUrls: ['./wards.page.scss'],
})
export class WardsPage implements OnInit {

  json:any=[{wardName:'Swargate' ,wardNo:'1',location:'169,Near jr college,pune'},{wardName:'Pimpri Chinchwad' ,wardNo:'2',location:'896,Ashok Nagar'},{wardName:'Narhe' ,wardNo:'3',location:'Samadhan Nagar'}];
  selectedPath='';
  temp:any;
  isRegistered:boolean=false;
  mobile:any;
  currentUser: any = {};

  constructor(private router:Router,public modalController: ModalController,public authService: AuthService,private activatedRoute: ActivatedRoute) {

    this.router.events.subscribe((event:RouterEvent)=>{
      if(event && event.url){
      this.selectedPath=event.url;
     this.mobile= this.selectedPath.split('/')[2];


      }
          });
    // console.log("login")



   }

  ngOnInit() {
  }



  greed(obj: any) {
    this.temp=obj;

    this.authService.getProfile(this.mobile).subscribe(res => {
      console.log(res);
      this.currentUser = res;
      console.log(this.currentUser.isRegistered);
      this.isRegistered=this.currentUser.isRegistered;
     if(this.isRegistered){
       console.log("true if blog");

     }else{
      this.presentModal();

     }




    })



    // console.log(obj);
    // this.temp=obj;
    // if(this.isRegistered)
    //  {
    //  console.log("registerd");
    //  }
    //  else{
    //   this.presentModal();
    //  }


  }

  async presentModal() {
    console.log(this.temp);

    const modal = await this.modalController.create({

      component: RegistrationPage,
      cssClass: 'my-custom-class',
      componentProps: {
       'wardName2':this.temp.wardName,
       'mobile':this.mobile
      }
    });
    return await modal.present();
  }

}

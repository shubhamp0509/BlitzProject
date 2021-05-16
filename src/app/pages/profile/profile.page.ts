import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileName:String;
  userEmail:String;
  mobile:any;
  selectedPath='';
  profeesion:String;
  contactNumber:string;
  profilesrc:string


  currentUser: any = {};
  members:any=[];

  constructor(private router:Router,public authService: AuthService,private activatedRoute: ActivatedRoute) {
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


             this.profileName=this.currentUser.fName;
             this.userEmail=this.currentUser.email;
             this.profeesion=  this.currentUser.profeesion
             this.contactNumber=this.currentUser. mobile
             this.profilesrc=this.currentUser.profileImage
            //  this.profilesrc=this.path+this.profilesrc
             console.log(this.profilesrc)
          })


          this.authService.getMember(mobile).subscribe(res => {
            console.log(res);

            this.members = res;
            // console.log(this.currentUser.isRegistered);


            //  this.profileName=this.currentUser.fName;
            //  this.userEmail=this.currentUser.email;
            //  this.profeesion=  this.currentUser.profeesion
            //  this.contactNumber=this.currentUser. mobile
            //  this.currentUser. email
          })






  }

  getMemberList(){
    this.router.navigate(['/menu/'+this.mobile+'/member-list'])
  }


  backForward(){
    this.router.navigate(['/menu/' + this.mobile+"/wards"]);
  }

  ngOnInit() {
  }

}

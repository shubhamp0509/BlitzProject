import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {

  mobile:any=''
  members:any=[];

  constructor(private router:Router,public authService: AuthService,private activatedRoute: ActivatedRoute) {

    console.log("Hello")
    let mobile = this.activatedRoute.snapshot.paramMap.get('mobile');
      console.log(mobile)
      this.mobile=mobile;

    this.authService.getMember(mobile).subscribe(res => {


      console.log(res);
      this.members=res;


      // console.log(this.currentUser.isRegistered);


      //  this.profileName=this.currentUser.fName;
      //  this.userEmail=this.currentUser.email;
      //  this.profeesion=  this.currentUser.profeesion
      //  this.contactNumber=this.currentUser. mobile
      //  this.currentUser. email
    })

   }

   backButton(){
     this.router.navigate(['/menu/'+this.mobile+'/profilepage'])
   }

  ngOnInit() {
  }

}

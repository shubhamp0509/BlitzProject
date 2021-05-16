import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormControl } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IonSlides} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;

  RegForm: FormGroup;

  defaultDate = "1987-06-30";
  isSubmitted = true;
password1: any;
cpassword1: any;
lastImage:any=null;

  constructor(public formBuilder: FormBuilder,public authService: AuthService,public router: Router) {

    this.RegForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      Mname: ['', [Validators.required, Validators.minLength(3)]],
      Lname: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      profession: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('(0/91)?[7-9][0-9]{9}')]],
      gender:['',Validators.required],
      blodGroup:['',Validators.required],
      username:['',[Validators.required, Validators.minLength(5)]],
      password:['',[Validators.required, Validators.minLength(5)]],
      cpassword:['',[Validators.required]]
    },{
validators:this.MustMatch('password','cpassword')
    });


   }



  ngOnInit() {
  }

  registerUser() {
    console.log("in register user");
    this.authService.register(this.RegForm.value).subscribe((res) => {
      if (res.result) {
        // this.registerForm.reset()
        // this.router.navigate(['login']);
      }
    })
  }

  MustMatch(controlName: string,matchingControlName: string){

    return(fg: FormGroup)=>{
      const control=fg.controls[controlName];
      const Matchingcontrol=fg.controls[matchingControlName];

      if(Matchingcontrol.errors && !Matchingcontrol.errors.MustMatch){
        return
      }
      if(control.value !== Matchingcontrol.value){
        Matchingcontrol.setErrors({MustMatch:true})
      }
      else{
        Matchingcontrol.setErrors(null);
      }

    }


  }

  //DATE convert dd-mm-yyyy
getDate(e) {
  let date = new Date(e.target.value).toISOString().substring(0, 10);
  this.RegForm.get('dob').setValue(date, {
     onlyself: true
  })
}

  public next(){
    this.slides.slideNext();
  }

  public prev(){
    this.slides.slidePrev();
  }

  get errorControl() {
    return this.RegForm.controls;

  }




}

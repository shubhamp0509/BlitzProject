import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, RouterEvent,Router } from '@angular/router';
import {ModalController} from '@ionic/angular'
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  @Input()  wardName2:string;
  @Input() mobile:string;

  wardName3:string="sasda";
  registerMember:FormGroup;
private file:File;


  constructor(public formBuilder: FormBuilder,public authService: AuthService,private router:Router,private modalCtrl:ModalController,private http:HttpClient) {

    this.registerMember=formBuilder.group({
      wardName:(this.wardName2),
      fullname:(''),
      phone:(this.mobile),
      address:(''),
      dob:(''),
      blood:(''),
      profession:(''),
      gender:(''),
      password:(''),
      cpassword:(''),
      fileSource:('')

    });



  }

  ngOnInit() {
  }
  submitForm(){
    console.log(this.registerMember.value);

    this.authService.register(this.registerMember.value).subscribe((res) => {
      if (res.result) {
        // this.registerForm.reset()
        // this.router.navigate(['login']);
      }
    })
    this.submitImage()

    this.closer()




  }

  url=""

  BackButton(){
    this.router.navigate(['/menu/' + this.mobile+"/wards"]);
    this.closer()

  }
  async closer()
  {
    await this.modalCtrl.dismiss();
  }

  onFileChange(fileChangeEvent) {

    // if(fileChangeEvent.target.files){
    //   var reader=new FileReader()
    //   reader.readAsDataURL(fileChangeEvent.target.files[0])
    //   reader.onload=(event:any)=>{
    //     this.url=event.target.result;
    //   }
    // }

    this. file = fileChangeEvent.target.files[0];
    this.registerMember.patchValue({
      fileSource: this.file
    });
    console.log("on file change"+this.file);
  }

  async submitImage() {
    const formData = new FormData();
    formData.append('file', this.registerMember.get('fileSource').value);
    console.log("on file change"+this.file);


    alert('file uploaded successfully');
    this.http.post("http://localhost:3000/login/imagePost/"+this.mobile, formData).subscribe((response) => {

      console.log(response);

    });
  }



}

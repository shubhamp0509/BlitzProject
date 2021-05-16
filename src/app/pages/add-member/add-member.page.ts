import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, RouterEvent,Router } from '@angular/router';
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  registerMember:FormGroup;
  @Input() mobile:string;

  constructor(public formBuilder: FormBuilder,public authService: AuthService,private router:Router,private modalCtrl:ModalController) {

    this.registerMember=formBuilder.group({

      fullname:(''),
      phone:(''),
      address:(''),
      dob:(''),
      blood:(''),
      profession:(''),
      gender:(''),
     relation:('')

    });


   }

  ngOnInit() {
  }

  submitForm(){
     console.log(this.registerMember.value);
    this.authService.addMember(this.registerMember.value,this.mobile).subscribe((res) => {
      if (res.result) {
        // this.registerForm.reset()
        // this.router.navigate(['login']);
      }
    })






  }

  BackButton(){
    console.log(this.mobile)
    this.router.navigate(['/menu/' + this.mobile+"/wards"]);
    this.closer()

  }

  async closer()
  {
    await this.modalCtrl.dismiss();
  }

}

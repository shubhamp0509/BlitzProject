import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: any;

  constructor(public formBuilder: FormBuilder,public authService: AuthService,public router: Router) {

    this.loginForm = this.formBuilder.group({
      username: (''),
      password: ('')
    })

  }



  login() {
    console.log(this.loginForm.value)

    this.authService.login(this.loginForm.value)
    this.loginForm = this.formBuilder.group({
      username: (''),
      password: ('')
    })
    // this.loginForm.value='';
  }


  ngOnInit() {
  }

}

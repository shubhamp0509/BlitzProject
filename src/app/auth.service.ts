import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";


import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'http://localhost:3000/login';
  API_URL1:string='http://localhost:3000/login/SendOtp?';
  API_URL2:string='http://localhost:3000/login/verify?';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  temp:string;
  channel:string='sms'


  constructor(private httpClient: HttpClient,public router: Router) { }

  register(user: User): Observable<any> {
    console.log("register");

    return this.httpClient.post(this.API_URL+"/registration", user).pipe(
        catchError(this.handleError)
    )
  }

  addMember(user:User,mobile:any):Observable<any>{
    console.log(mobile)
    console.log(user)

    return this.httpClient.post(this.API_URL+"/addMember:"+mobile, user).pipe(
      catchError(this.handleError)
  )
  }

  getMember(mobile:any):Observable<any>{
    return this.httpClient.get(`${this.API_URL}/member/getMember:${mobile}`).pipe(map((res:Response)=>{
      return res || {}
    }),catchError(this.handleError))
  }



  login(user: User) {
    console.log(user);
    return this.httpClient.post<any>(this.API_URL+"/", user)
      .subscribe((res: any) => {


          // console.log(res.token);
          document.cookie = `access_token=${res.token}`
        localStorage.setItem('access_token', res.token)   //token
      //  this. headers = new HttpHeaders({ 'authorization': 'JWT ' + res.token });
          this.temp=res.token


if(res.msg=="Unathorised user"){

  console.log("Unathorised user");
}




        this.getUserProfile(res.mobile).subscribe((res) => {
          this.currentUser = res;
          console.log(res.mobile);
         // console.log(this.currentUser);
           this.router.navigate(['/menu/' + res.mobile]);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {

    // return !!localStorage.getItem('access_token');
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['/']);
    }
  }

  getProfile(mobile:any):Observable<any>{
    console.log("hello",mobile)
    return this.httpClient.get(`${this.API_URL}/${mobile}`).pipe(map((res:Response)=>{
      return res || {}
    }),catchError(this.handleError))
  }

  getUserProfile(mobile): Observable<any> {
    console.log("Call to user profile");
    // console.log(this.currentUser)

    return this.httpClient.get(`${this.API_URL}/${mobile}`, { headers: this.headers.set("auth",this.temp) }).pipe(
      map((res: Response) => {
         console.log("Response");
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
 // localhost:3000/login?phonenumber=918855835289&channel=sms

  reg(data:any){
    // query
   // const opts = { params: new HttpParams({fromString: `phonenumber=${data.value.mobileno}&channel=${this.channel}`}) };

    // this.temp=`${this.API_URL1}phonenumber=${data.value.mobileno}&channel=${this.channel}`;

    this.httpClient.get<any>(`${this.API_URL1}phonenumber=${data.value.mobileno}&channel=${this.channel}`).subscribe((res)=>{

      console.log("Hello"+res);
                  // console.log(res.token);

                })


  }
  verifyOtp(data){
    console.log("In serveice");
    console.log(data);
    this.httpClient.get<any>(`${this.API_URL2}phonenumber=${data.mobile}&code=${data.otp}`).subscribe((res)=>{
      console.log(res.data.status);
      console.log(res.token);
      if(res.data.status=="approved"){
          console.log("correct otp"+res.token);
          document.cookie = `access_token=${res.token}`
          localStorage.setItem('access_token', res.token)   //token
        //  this. headers = new HttpHeaders({ 'authorization': 'JWT ' + res.token });
            this.temp=res.token

          console.log(data.mobile);



          this.getUserProfile(data.mobile).subscribe((res) => {
            this.currentUser = res;
            console.log("In get user profile");
            console.log(this.currentUser);
            // console.log(res.doc.mobile);
             this.router.navigate(['/menu/' + res.mobile+'/wards']);

          })




      }else{
        console.log("Wrong otp");

      }
    })



  }



}

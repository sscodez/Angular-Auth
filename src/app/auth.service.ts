import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './appModels/user.Model';
import { ErrorService } from './error.service';
import { AuthResponse } from './interface/auth-response';

const API_KEY= 'AIzaSyCOSqnwU84C021yRXqBDGu6ODPjpr6wGoo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user =new Subject<User>();

profileInfo= new BehaviorSubject({
  displayName:'',
  email:'',
  photoUrl:''

})
  private tokenExpirationTimer:any;
  constructor(private http:HttpClient, private _errService:ErrorService,private router:Router ) { }
  signUp(email:any,password:any){
   return  this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
 {  email:email,
   password:password,
    returnSecureToken:true}).pipe(catchError(err=>{
     return this._errService.handleError(err)

    }),tap(res=>{
      this.auhenticateUser(res.email,res.localId,res.idToken,res.expiresIn)
     })
    )
  }

  signIn(email:any,password:any){
   return  this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
 {  email:email,
   password:password,
   returnSecureToken:true}).pipe(catchError(err=>{
    return this._errService.handleError(err)

   }),tap(res=>{
    this.auhenticateUser(res.email,res.localId,res.idToken,res.expiresIn)
   })
   ); 
  }
  autoSignIn(){
    const userData=JSON.parse(localStorage.getItem('UserData') || '{}');
    if(!userData)
    {  
      return;
    }
    const loggedInUser = new User (userData.email,userData.userId,userData._token,new Date(userData._expirationDate))
    if(loggedInUser.token1)
    {
      this.user.next(loggedInUser);
      // const expirationDate=new Date(userData._expirationDate).getTime()-new Date().getTime()
      // this.autoSignOut(expirationDate);
    }
  }
 
  SignOut(){
    this.user.next(undefined);
    this.router.navigate(['sign-in']);
    localStorage.removeItem('UserData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null;
  }
  autoSignOut(expirationDuration:number)
  {  
    this.tokenExpirationTimer=setTimeout(() => {
      this.SignOut()
    }, expirationDuration);
  }
  private auhenticateUser(email:string,userId:string,token:string,expiresIn:any){
    const expirationDate =new Date(new Date().getTime()+expiresIn*1000)
    const user = new User (email,userId,token,expirationDate)
    console.log('user=>',user)
    this.user.next(user);
    this.autoSignOut(expiresIn*1000)
    localStorage.setItem('UserData',JSON.stringify(user))
    this.getUserData(token);
  }
  updateProfile(data:any){
    return  this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
      "idToken":data.token,
      "displayName":data.name,
      "photoUrl":data.picture,
      "returnSecureToken":true,
      
    }).pipe(catchError(err=>{
      return this._errService.handleError(err)
 
     })
     )

  }
  getUserData(token:any){
    this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,{
 
    idToken:token
 
  }
     ).subscribe(res=>{
      this.profileInfo.next({
        displayName:res.users[0].displayName,
        email:res.users[0].email,
        photoUrl:res.users[0].photoUrl
      })
     })
  }


}
// 
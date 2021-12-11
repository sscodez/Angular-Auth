import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
User:any;
  isLoggedIn:boolean=false;
  constructor(private _authService:AuthService, private router:Router) {
    this._authService.profileInfo.subscribe(res=>{
      this.User=res;
    })
  }

  ngOnInit():void{

    this._authService.user.subscribe(res=>{
      if(res){
        this.isLoggedIn=true;
      }
    else{
      this.isLoggedIn=false;
    }})
    
    this._authService.autoSignIn();
  }
 

  title = 'my-first-project';

  public items: { field: string }[] = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' }
];
status: boolean = false;
clickEvent(){
    this.status = !this.status;       
}

onSignOut(){
  this._authService.SignOut();
  console.log('hey');

}
  
onDiscard()
{ 
 this.router.navigate([],{queryParams:{EditMode:false}}) 
}
  
}

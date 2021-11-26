import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ErrorService } from '../error.service';
import { AuthResponse } from '../interface/auth-response';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginMode:boolean=true;
  error:string;
  errMsgs:any=this._errService.errorsMsgs;
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,private _authService:AuthService,private _errService:ErrorService,private router:Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null,[ Validators.required,Validators.email]],
      password: [null, [Validators.required,Validators.minLength(4)]],
 
      })
    }
  onModeSwitch()
  {
    this.loginMode=!this.loginMode;
  }
  resetForm() { 
    this.form.reset();
  }  
  onSubmit() {
    
    if(this.form.valid)
    {
    
      const email=this.form.value.email;
      const password=this.form.value.password;
      
      let authObservable :Observable<AuthResponse>
      if(this.loginMode)
      {  
        authObservable =this._authService.signIn(email,password)
  
      }
      else{
        
        authObservable =this._authService.signUp(email,password)
  
      }
      authObservable.subscribe(res=>{
        console.log(res)
        this.router.navigate(['modal'])
      },err=>{
        console.log(err)
        // this.error=err.error.error.message;
       this.error=err;
        
       
      
      })
     
    }
      
  }


}

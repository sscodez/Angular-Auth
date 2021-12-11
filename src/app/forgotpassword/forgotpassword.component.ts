import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private _authService:AuthService) { }
  form: FormGroup;
  showpassword:boolean;
  success:boolean=false;
  error:any=null;
  token =JSON.parse(localStorage.getItem('UserData')||'{}')._token;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
 
      })
  }

  onSubmit(){

    if(this.form.valid){
      console.log(this.form.value)
      const data={idToken:this.token,...this.form.value}
      this._authService.changePassword(data).subscribe(res=>{
        console.log(res);
        this.success=true;
      })

    }
  }
  

}

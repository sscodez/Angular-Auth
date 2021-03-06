import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private _authService:AuthService) { }
  form: FormGroup;
  showpassword:boolean;
  success:boolean=false;
  token =JSON.parse(localStorage.getItem('UserData')||'{}')._token;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required,Validators.minLength(4)]],
 
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
  onModeSwitch()
  {
    this.showpassword=!this.showpassword;
  }

}

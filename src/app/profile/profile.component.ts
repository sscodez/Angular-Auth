import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  editMode:boolean=false;
  token =JSON.parse(localStorage.getItem('UserData')||'{}')._token;
  profileInfo:any;

  constructor(private formBuilder: FormBuilder,private _authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute) {
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     name: [null,[ Validators.required,Validators.minLength(4)]],
      url: [null, [Validators.required,Validators.minLength(4)]],
 
      })
      this.activatedRoute.queryParamMap.subscribe(res=>{
       let qParams= (res.get('EditMode'));
       if(qParams !=null)
       {
        this.editMode =true;
       }
       else{
        this.editMode =false;
       }
      })
      this._authService.profileInfo.subscribe(res=>{
   
        this.form.setValue({
          name:res.displayName,
          url:res.photoUrl
        })
     })
  }
  onSubmit()
  {
      if(this.form.valid)
       {
        const name=this.form.value.name;
        const url=this.form.value.url;
        
     const uData= ({token:this.token,...this.form.value})

        this._authService.updateProfile(uData).subscribe((res)=>{
          
          
          console.log(res)
        this._authService.getUserData(this.token)
        
        },(err)=>console.log(err))
   }
      
  }
  onDiscard()
{ 
 this.router.navigate([],{queryParams:{EditMode:null}}) 
}
}

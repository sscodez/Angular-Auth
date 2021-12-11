import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { StudentService } from '../shared/student.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

User:any;
fetching:boolean
form: FormGroup;
submitted = false;
  constructor( private _project:ProjectService,private _authService:AuthService,private formBuilder: FormBuilder) {
    this._authService.profileInfo.subscribe(res=>{
      this.User=res;
    })

   }
  


  ngOnInit(): void {
   this.form = this.formBuilder.group({
    id: [null,[ Validators.required,Validators.email]],
    name: [null, [Validators.required,Validators.minLength(4)]],

    })
  }
  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    
    
    }



 this._project.createStudent(this.form.value)
    // let data=form.value;
    // this.firestore.collection('employees').add(data);
    alert('Your Form has been submitted successfully');
     this.submitted = false;
    this.form.reset();
  }

 
 
}


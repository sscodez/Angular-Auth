import { Component, OnInit } from '@angular/core';
import {AngularFirestore}from 'angularfire2/firestore'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,AbstractControl
} from '@angular/forms';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form:FormGroup;
  submitted = false;
 
   
  constructor(private formBuilder: FormBuilder, private _user:ProjectService) {}
  ngOnInit() {
    this.form = this.formBuilder.group({

      firstname: [null,[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      lastname: [null,[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      class: [null, [Validators.required,Validators.maxLength(2), Validators.pattern(/[0-9]/)]],
      Message: [null,[ Validators.required,Validators.maxLength(20),Validators.minLength(6)]]
      
      })
    }


    get f() { return this.form.controls; }
    onSubmit(){
      this.submitted = true;
      if (this.form.invalid) {
       
        return;
      
      
      }

      console.log(this.form.value)
   this._user.createStudent(this.form.value)
  
      alert('Your Form has been submitted successfully');
       this.submitted = false;
      this.form.reset();
    }

}

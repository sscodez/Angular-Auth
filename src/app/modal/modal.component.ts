import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import { StudentService } from '../shared/student.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

User:any;
fetching:boolean
  
  constructor( private _project:ProjectService,private _authService:AuthService) {
    this._authService.profileInfo.subscribe(res=>{
      this.User=res;
    })

   }

 
   products = [
    { id: '1', name: "ali" },
     ];
  


  ngOnInit(): void {
   this.onFetchProducts();
  }
  msg:string="";

  onAddProducts(id:any,name:any){
   
    this.products.push({
        id:id.value,
        name:name.value,
    
    })
    this._project.saveProducts(this.products).subscribe( (response)=>console.log(response),
    (err)=>console.log(err));
  }
    
    onSaveProducts(){
      this._project.saveProducts(this.products).subscribe( (response)=>console.log(response),
      (err)=>console.log(err));
     
    }
  
    onFetchProducts(){
      this.fetching=true;
      this._project.fetchProducts().subscribe( (response)=>{console.log(response)
      const data=JSON.stringify(response)
      console.log(data);
      this.products=JSON.parse(data)
      this.fetching=false;
      
      },
      (err)=>console.log(err));
    }
    onDeleteProducts(id:any){
      this.products.splice(id,1)
      this.onSaveProducts();
   
    }
 
}


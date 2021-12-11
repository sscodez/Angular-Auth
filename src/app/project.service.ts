import { Injectable } from '@angular/core';
import {AngularFirestore}from 'angularfire2/firestore'
import {User} from './user.model'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private angularFirestore:AngularFirestore) { }

  getUserDoc(id:any){
    return this.angularFirestore
    .collection('student-collection')
    .doc(id)
    .valueChanges()
  }

  getUserList(){ 
    return this.angularFirestore.collection("student-collection").snapshotChanges();

  }
  createStudent(user:User)
  { 
    return new Promise<any>((resolve,reject)=>{
      this.angularFirestore.collection("student-collection")
      .add(user)
      .then(response=>{console.log(response)},error=>reject(error))
    })
  }
  deleteStudent(user:User){
    return this.angularFirestore
    .collection("student-collection")
    .doc(user.id)
    .delete()
  }

  updateStudent(user:User,id:any){
    return this.angularFirestore
    .collection("student-collection")
    .doc(id)
    .update({
      firstname:user.firstname,
      lastname:user.lastname,
      class:user.class,
      Message:user.Message
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import {User} from '../user.model'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  User:User[];
  constructor(private user:ProjectService) { }

  ngOnInit(): void {
    this.user.getUserList().subscribe(res=>{
      this.User=res.map(e=>{
        return{
          id:e.payload.doc.id,
          ...e.payload.doc.data()as{}

        }as User;
      })
    })
  }

  removeUser(User:any){
    if(confirm("Are you sure to delete " +  User.fullname))
      this.user.deleteStudent(User)
  }

}

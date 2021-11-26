import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Student} from './student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  formData: Student;

  constructor(private firestore: AngularFirestore) { }

  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }
}

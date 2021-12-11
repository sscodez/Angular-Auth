import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ProjectService} from './project.service'
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes,RouterModule } from '@angular/router';
import {SignInComponent}from './sign-in/sign-in.component'
import {ModalComponent} from './modal/modal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';	
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const firebaseConfig = {
  apiKey: "AIzaSyCOSqnwU84C021yRXqBDGu6ODPjpr6wGoo",
  authDomain: "my-angula-project.firebaseapp.com",
  databaseURL: "https://my-angula-project-default-rtdb.firebaseio.com",
  projectId: "my-angula-project",
  storageBucket: "my-angula-project.appspot.com",
  messagingSenderId: "581693137515",
  appId: "1:581693137515:web:ab80e117b381c1edd7072e",
  measurementId: "${config.measurementId}"
};
const appRoutes:Routes=[
  {path:'',component:SignInComponent},  
  {path:'form',component:FormComponent},  
  {path:'list',component:ListComponent},
  {path:'update-student/id',component:EditStudentComponent},    
  {path:'modal',canActivate:[AuthGuard],component:ModalComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'forgotpassword',component: ForgotpasswordComponent },
  {path:'change-password',canActivate:[AuthGuard],component:ChangePasswordComponent}
  
  ,

]
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SignInComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ForgotpasswordComponent,
    FormComponent,
    ListComponent,
    EditStudentComponent,
   
   

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularFirestoreModule,

  ],
  providers: [ProjectService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

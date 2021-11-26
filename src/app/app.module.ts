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


const appRoutes:Routes=[
  {path:'',component:SignInComponent},  
  {path:'modal',component:ModalComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'profile',component:ProfileComponent},
  {path:'change-password',component:ChangePasswordComponent}
  
  ,

]
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SignInComponent,
    ProfileComponent,
    ChangePasswordComponent,
   
   

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  

  ],
  providers: [ProjectService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

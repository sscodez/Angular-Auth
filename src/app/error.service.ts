import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  handleError(err:HttpErrorResponse){
    if(!err.error || !err.error.error)
    {  
      return throwError('UNKNOWN')
      // this.error=this.errMsgs['UNKNOWN']
    }
    else{
      // this.error=this.errMsgs[err.error.error.message]
      return throwError(err.error.error.message)
    }
  }
  errorsMsgs={
    UNKNOWN:'An Unkown Error is Occured',
    EMAIL_EXISTS:'This Email is Already Exist .Please try with another one  ',
    OPERATION_NOT_ALLOWED:'Password Sign-in is disabled for this Project',
    TOO_MANY_ATTEMPTS_TRY_LATER:'We have blocked All the Requests from this Device',  
    EMAIL_NOT_FOUND:'There is no user record corresponding to this identifier ',
    INVALID_PASSWORD:'Wrong Password',
    USER_DISABLED:'The user account hs been disabled by admistrator'

  }
  
}

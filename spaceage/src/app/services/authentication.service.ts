 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    ROOT_URI: String = "http://spaceage-env.eba-qf52mubb.us-east-2.elasticbeanstalk.com/api/"

   //ROOT_URI: String = "http://localhost:5000/api/"


  constructor(
    private httpClient:HttpClient
  ) { 
     }

     authenticate(username: string, password: string) {
         return this.httpClient.post<any>(this.ROOT_URI +"authenticate", { username, password }).pipe(
             map(
                 userData => {
                     sessionStorage.setItem('username', username);
                     let tokenStr = 'Bearer ' + userData.token;
                     sessionStorage.setItem('token', tokenStr);
                     return userData;
                 }
             )

         );
    }
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
      sessionStorage.removeItem('username')
     
      sessionStorage.removeItem('token')
  }
}
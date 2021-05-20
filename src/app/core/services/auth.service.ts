import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiurl+'Auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
constructor(private http: HttpClient) { }
login(form: any){
  return this.http.post(this.baseUrl+'login', form)
  .pipe(map ((response: any) => {
    debugger;
    const user = response.res;
    if (user) {
      localStorage.setItem('token', user);
      this.decodedToken = this.jwtHelper.decodeToken(user);
      console.log(this.decodedToken);
      
    }
  }));
}
loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
tokendata(){
  const token = localStorage.getItem('token');
  this.decodedToken = this.jwtHelper.decodeToken(token);
  return this.decodedToken.role;
}
register(form: any){
  return this.http.post(this.baseUrl+'register', form)
  .pipe(map ((response: any) => {
    debugger;
    const user = response.res;
    if (user) {
      localStorage.setItem('token', user);
      this.decodedToken = this.jwtHelper.decodeToken(user);
      console.log(this.decodedToken);
    }
  }));
}
}

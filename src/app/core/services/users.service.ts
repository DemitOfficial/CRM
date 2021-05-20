import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiurl+'User/';
  baseUrl2 = environment.apiurl + 'Company/';
constructor(private http: HttpClient) { }

GetAllUsers(){
  debugger;

  return this.http.get<any>('https://localhost:44396/Api/User/GetUsers',header)
}

}

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
var header = {
  headers: new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
}

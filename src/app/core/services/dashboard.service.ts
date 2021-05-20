import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiurl + 'Dashboard/';
constructor(private http: HttpClient) { }

GetAdminDashboardData(){
  debugger;
  var token=(localStorage.getItem('token')) 
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + token)
  }
    return this.http.get<any>(this.baseUrl+'AdminDashboard',header)
  }


  GetUserDashboardData(){
    debugger;
    var token=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + token)
    }
      return this.http.get<any>(this.baseUrl+'UserDashboard',header)
    }
}

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
var headerr = {
  headers: new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
}
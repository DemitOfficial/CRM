import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  baseUrl = environment.apiurl + 'Message/';
constructor(private http: HttpClient) { }
PostMessage(form:any){
  debugger;

  return this.http.post<any>(this.baseUrl+'SendSmsMessage',form,header)
}
PostEmaile(form:any){
  debugger;

  return this.http.post<any>(this.baseUrl+'SendEmailMessage',form,header)
}
GetEmailMessage(){
  debugger;

  return this.http.get<any>(this.baseUrl+'GetEmailMessage',header)
}
GetMessage(){
  debugger;

  return this.http.get<any>(this.baseUrl+'GetSmsMessage',header)
}
}
var header = {
  headers: new HttpHeaders()
    .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
}
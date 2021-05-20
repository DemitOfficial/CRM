import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  baseUrl = environment.apiurl + 'Ticket/';
constructor(private http: HttpClient) { }
AddQuotation(form:any){
  debugger;

  const body=form;
  var data=(localStorage.getItem('token'))      
    return this.http.post<any>(this.baseUrl+'QuoteTicket',body,httpOptions)
  }
  MyQuotations(){
    debugger;
    var token=(localStorage.getItem('token')) 
      var headers = {
        headers: new HttpHeaders()
          .set('Authorization',  'Bearer ' + token)
      } 
      return this.http.get<any>(this.baseUrl+'GetUserQuotedTickets',headers)
    }
    AllQuotations(){
      debugger;
      var token=(localStorage.getItem('token')) 
        var headers = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + token)
        } 
        return this.http.get<any>(this.baseUrl+'GetQuotations',headers)
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

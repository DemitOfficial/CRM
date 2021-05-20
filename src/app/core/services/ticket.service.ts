import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = environment.apiurl + 'Ticket/';
constructor(private http: HttpClient) { }
PostTicket(form:any){
  debugger;
  console.log(localStorage.getItem('token'));
  
    return this.http.post<any>(this.baseUrl+'CreateuserTicket',form,httpOptions)
  };
  updateticket(form:any){
    debugger;
    console.log(localStorage.getItem('token'));
    
      return this.http.post<any>(this.baseUrl+'updateticket',form,httpOptions)
    }
    removeticket(Id:Number){

      const body=Id;
      var data=(localStorage.getItem('token'))  
      return this.http.post<any>(this.baseUrl+'DeleteTicket',body,httpOptions)
    }
  Replyticket(data:any){
    debugger;
    var formData: any = new FormData();
      formData.append("DocumentPath", data.DocumentPath);
     formData.append("Message",data.Message);
     formData.append("ReplyFromUserId",0);
     formData.append("TicketId",data.TicketId);
    console.log(localStorage.getItem('token'));

      return this.http.post<any>(this.baseUrl+'ReplyTicket',formData,header)
    }
  GetUserTicket(){
    debugger;
    var token=(localStorage.getItem('token')) 
    var headers = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + token)
    } 
      return this.http.get<any>(this.baseUrl+'GetUserTickets',headers)
    };
    GetUserOfferTickets(){
      var token=(localStorage.getItem('token')) 
      var headers = {
        headers: new HttpHeaders()
          .set('Authorization',  'Bearer ' + token)
      } 
        return this.http.get<any>(this.baseUrl+'GetUserOfferTickets',headers)
      };
      GetUserRfqTickets(){
        var token=(localStorage.getItem('token')) 
        var headers = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + token)
        } 
          return this.http.get<any>(this.baseUrl+'GetUserRfqTickets',headers)
        };
        GetUserSalesTickets(){
          var token=(localStorage.getItem('token')) 
          var headers = {
            headers: new HttpHeaders()
              .set('Authorization',  'Bearer ' + token)
          } 
            return this.http.get<any>(this.baseUrl+'GetUserSalesTickets',headers)
          };
          GetUserQouteeTickets(){
            var token=(localStorage.getItem('token')) 
            var headers = {
              headers: new HttpHeaders()
                .set('Authorization',  'Bearer ' + token)
            } 
              return this.http.get<any>(this.baseUrl+'GetUserQouteeTickets',headers)
            };
    GetUserTicketByAdmin(Id:any){
      debugger;
    
    
      const body=Id;
      var data=(localStorage.getItem('token'))      
        return this.http.post<any>(this.baseUrl+'GetUserInfoWithTickets',body,httpOptions)
      }
      GetTicketRepliesByAdmin(Id:any){
        debugger;
      
        const body=(Id);
        var data=(localStorage.getItem('token'))      
          return this.http.post<any>(this.baseUrl+'GetTicketReplies',body,httpOptions)
        }
           Thirdpartyticketinfo(TicketId:any){
        debugger;
      
      
          return this.http.post<any>(this.baseUrl+'TicketInfoUnknows',TicketId)
        }
      getAlltickets(){
debugger;
var token=(localStorage.getItem('token')) 
var header = {
  headers: new HttpHeaders()
    .set('Authorization',  'Bearer ' + token)
}    
          return this.http.get<any>(this.baseUrl+'GetAllTickets',header)
        }
  GetFunnel(){
    debugger;
      return this.http.get<any>(this.baseUrl+'GetFunnel',header)
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

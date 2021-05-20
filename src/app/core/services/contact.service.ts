import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiurl + 'Upload/';
  baseUrl2 = environment.apiurl + 'Contact/';
constructor(private http: HttpClient) { }
uploadxlsx(file: File): Observable<any> {
  debugger;
  var formData: any = new FormData();
  formData.append("file", file);
  return this.http.post(this.baseUrl+"uploadfile", formData).pipe(
 
  )
}
GetCOntactInfo3(Id:any){
  debugger;


    return this.http.post<any>(this.baseUrl2+'GetSingleContact',Id)
  }
Addcontact(data:any){


    return this.http.post<any>(this.baseUrl2+'CreateContact',data,header)
  }
  UpdateContact(data:any){


    return this.http.post<any>(this.baseUrl2+'EditContact',data,header)
  }
  DeleteContacts(form:any){
    debugger;
  
    const body=form;
    var data=(localStorage.getItem('token'))      
      return this.http.post<any>(this.baseUrl+'DeleteUser',body,httpOptions)
    }
  removecontact(data:any){


    return this.http.post<any>(this.baseUrl2+'DeleteContact',data,header)
  }
Getcontactslist(){
  debugger;

  return this.http.get<any>(this.baseUrl+'Getcontacts',header)
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

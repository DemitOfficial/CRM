import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConpanyService {
  baseUrl = environment.apiurl + 'User/';
  baseUrl2 = environment.apiurl + 'Company/';
constructor(private http: HttpClient) { }

GetAllUsers(){
  debugger;
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
  }

  return this.http.get<any>(this.baseUrl+'GetUsers',header)
}
Addcompany(data:any){
  debugger;    
  var formData: any = new FormData();
    formData.append("ComapnyName", data.companyname);
   formData.append("Address",data.address);
   formData.append("CompanyId",0);
   formData.append("Image",data.Image);
  console.log(localStorage.getItem('token'));
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
  }
    return this.http.post<any>(this.baseUrl2+'CreateCompany',formData,header)
  }
  UpdateCompany(data:any){
    debugger;    
    var formData: any = new FormData();
      formData.append("ComapnyName", data.companyname);
     formData.append("Address",data.address);
     formData.append("CompanyId",data.companyId);
     formData.append("Image",data.Image);
    console.log(localStorage.getItem('token'));
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
    }
      return this.http.post<any>(this.baseUrl2+'EditCompany',formData,header)
    }
    TransferEmployee(Form:any){
        
      var token=(localStorage.getItem('token')) 
    var headers = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' + token)
    } 
        return this.http.post<any>(this.baseUrl+'AddExistingUser',Form,headers)
      }
      ExpectedEmployees(Id:Number){
        var header = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
        }
      
          return this.http.post<any>(this.baseUrl+'ExpectedEmployees',Id,header)
        }
        GetCompanyEmployees(Id:Number){
          var header = {
            headers: new HttpHeaders()
              .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
          }
        
            return this.http.post<any>(this.baseUrl+'GetCompanyEmployees',Id,header)
          }
    RemoveCompany(Id:Number){
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
      }
    
        return this.http.post<any>(this.baseUrl2+'DeleteCompany',Id,header)
      }
      removeuser(Id:Number){
        var header = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
        }
    
        return this.http.post<any>(this.baseUrl+'DeleteUser',Id,header)
      }

      conpanyDetail(Id:Number){
        var header = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
        }
    
        return this.http.post<any>(this.baseUrl+'conpanyDetail',Id,header)
      }

      GetCompanyInfo3(Id:any){
        debugger;
      
      
          return this.http.post<any>(this.baseUrl2+'conpanyinfo',Id)
        }

GetUsersCompanyWise(){
  debugger;
  var header = {
    headers: new HttpHeaders()
      .set('Authorization',  'Bearer ' + localStorage.getItem('token'))
  }

  return this.http.get<any>(this.baseUrl+'GetcompanywiseUsers',header)
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


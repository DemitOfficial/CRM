import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { ConpanyService } from 'src/app/core/services/company.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss']
})
export class CompanydetailComponent implements OnInit {

 
  UsersList:User[]=[];
  CompanyUsers:any[]=[];
  name:string;
contactno:string;
email:string;
UserId:number;
CompanyId:number;
Usertickets:any;
Ticketdata:any[]=[];
decodedToken:any;
Userdata:any;
UserIdget:any;
IsUser:boolean=false;
UserName:string;
DashboardData:any;
Update:boolean=false;
Del:boolean=false;
operationname:string;
Name:string;
contactId:number;
Contact:string;
Email:string;
Address:string;
data:any;
key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
imagebaseurl=environment.imagepath+"CompanyImages/";
breadCrumbItems: Array<{}>;
constructor(private toastr:ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private companyservice:ConpanyService,private router:Router,private ticketservice:TicketService,private Dashboardservice:DashboardService) { }

ngOnInit() {
  this.modalService.dismissAll();
  this.breadCrumbItems = [{ label: 'Company' }, { label: 'Company Profile', active: true }];
  this.data=JSON.parse(localStorage.getItem("Companydata"))
  this.CompanyUsers=this.data.customers;
  var dd=JSON.parse(localStorage.getItem("GetcompanyfromUser"))
   if(dd.Fromuser==true)
  {
  debugger

    this.companyservice.conpanyDetail(Number(dd.Id)).subscribe((next:any)=>{
      this.CompanyUsers=next.res.customers;
      this.data=next.res;
  },error=>{
  })
 }
console.log(this.data)
}
getuserinfo(Id:number)
{
  debugger;
localStorage.setItem("UserId",Id.toString())
this.router.navigate(['admin/userdetail']);
}
navigator()
{
  localStorage.setItem("CreateCompany","True")
  this.router.navigate(['/home/admin/companies'])
}
Sort(key){
  debugger;
  this.key=key;
  this.reverse=!this.reverse;
}
TransEmployees(Addmodal:any,Id:number)
{
 this.CompanyId=Id;
  this.companyservice.ExpectedEmployees(Id).subscribe((next:any)=>{
    this.UsersList=next.res;
console.log(this.UsersList);


        },error=>{
        
        })
  this.modalService.open(Addmodal, { scrollable: true,size: 'xl',windowClass:'modal-holder', centered: true  });

  


}
TransferData(Id:number)
{
  debugger;
var data={"CompanyId":this.CompanyId,"CustomerId":Id}
  
 this.companyservice.TransferEmployee(data).subscribe((next:any)=>{
  this.toastr.success('User Updated Successfully!', 'Congrats', {
    titleClass: "center",
    messageClass: "center"
  });
  
  this.companyservice.GetCompanyEmployees(this.CompanyId).subscribe((next:any)=>{
    this.CompanyUsers=next.res;

},error=>{

  this.toastr.error('Something Wrong!', '', {
    titleClass: "center",
    messageClass: "center"
  });
})
  this.companyservice.ExpectedEmployees(this.CompanyId).subscribe((next:any)=>{
    this.UsersList=next.res;

},error=>{

  this.toastr.error('Something Wrong!', '', {
    titleClass: "center",
    messageClass: "center"
  });
})
})






}
Updateprofile(Id){
  debugger;
  this.Update=true;
  this.Del=false;

  this.operationname="Update Company";


}
DeleteCompany()
{
  debugger;

 this.companyservice.RemoveCompany(this.UserId).subscribe((next:any)=>{

   

    },error=>{
  
      console.log(error)
    })
  


}


}

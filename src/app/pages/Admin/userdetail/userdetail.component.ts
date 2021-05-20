import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConpanyService } from 'src/app/core/services/company.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})

export class UserdetailComponent implements OnInit {

  name:string;
contactno:string;
email:string;
UserId:number;
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
AssociatedCompany:string;
companyinfo:any;
@ViewChild('dismismodal',{static:false}) private modal: ElementRef;
@ViewChild('openmodal',{static:false}) private openmodal: ElementRef;
imagebaseurl=environment.imagepath+"CompanyImages/";
breadCrumbItems: Array<{}>;
constructor(private spinner: NgxSpinnerService,private modalService: NgbModal,private companyservice:ConpanyService,private router:Router,private ticketservice:TicketService,private Dashboardservice:DashboardService) { }

ngOnInit() {
  this.modalService.dismissAll();
  this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.UserIdget=localStorage.getItem("UserId");
    this.spinner.show();
    this.ticketservice.GetUserTicketByAdmin(this.UserIdget).subscribe((next:any)=>{
      debugger;
      this.spinner.hide();
      console.log(next)
      var data2=next.res;
      this.Ticketdata=next.res.ticketdata;
     this.companyinfo=next.res.companyinfo,
      this.Userdata=data2.userdata;
     
      this.UserName=this.Userdata.name;
      this.email=this.Userdata.email;
      this.contactno=this.Userdata.contact;

          },error=>{
     
          
          })
}


navigator()
{
  localStorage.setItem("CreateCompany","True")
  this.router.navigate(['/home/admin/companies'])
}
UpdateConfirm()
{
  debugger;

  var companydata={"UserName":this.UserName,"contactno":this.contactno,"companemailyId":this.email}

  this.companyservice.UpdateCompany(companydata).subscribe((next:any)=>{
      this.modal.nativeElement.click();
  
    },error=>{
      this.modal.nativeElement.click();
      console.log(error)
    })
  


}
companydetail(Id:number)
{
  var data={"Id":Id,"Fromuser":true};
  localStorage.setItem("GetcompanyfromUser",JSON.stringify(data))
  this.router.navigate(['/admin/companydetail'])
}



DeleteUser(Id:number)
{
  debugger;

 this.companyservice.removeuser(Id).subscribe((next:any)=>{


  this.router.navigate(['/home/admin/users'])
    },error=>{

      console.log(error)
    })
  


}
Updateprofile(Id){
  debugger;
  this.Update=true;
  this.Del=false;

  this.operationname="Update Company";

  this.openmodal.nativeElement.click();
}
DeleteCompany()
{
  debugger;

 this.companyservice.RemoveCompany(this.UserId).subscribe((next:any)=>{

      this.modal.nativeElement.click();

    },error=>{
      this.modal.nativeElement.click();
      console.log(error)
    })
  


}
// ticketreply(Id:Number)
// {
//   debugger;
//  var data=this.Ticketdata.filter(x=>x.ticketinfo.ticketId==Id);
//  localStorage.setItem("TicketData",JSON.stringify(data))
//  this.router.navigate(['/home/admin/ticketreply'])
// }

ticketdetail(Id:Number)
{
  debugger;
 var data=this.Ticketdata.filter(x=>x.ticketinfo.ticketId==Id);
 localStorage.setItem("TicketData",JSON.stringify(data))
 localStorage.setItem("UserInfo",JSON.stringify(this.Userdata))
 this.router.navigate(['/home/admin/ticketdetail'])
}

}

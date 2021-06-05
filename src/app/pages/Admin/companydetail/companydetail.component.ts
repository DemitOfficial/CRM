import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GetcompaniesDto } from 'src/app/core/models/GetcompaniesDto';
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

  companieslist:GetcompaniesDto []=[];

  UsersList:User[]=[];
   da:any []=[];
  tableData: any;
  CompanyUsers:any[]=[];
  name:string;
  file:any;
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
Create:boolean=false;
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
shareablelink:any;
IsCoppied:boolean=false;
number1:number;
  text:string="";
  comapnyName:string="";
  address:string="";
  Image:string="";
  files: File[] = [];
possible:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

scrollModal(scrollDataModal: any,companyId:number,operation:string) {

  if(operation=="Edit")
  {
   this.Update=true;
   this.Del=false;
   this.Create=false;
   this.operationname="Update Company";
  }
  if(operation=="remove")
  {
   this.Update=false;
   this.Del=true;
   this.Create=false;
   this.operationname="Confirm to Remove Company";
  }
var dd=this.data;
 this.comapnyName=this.data.companies.comapnyName;
 this.address=this.data.companies.address;
this.CompanyId=this.data.companies.companyId;
this.files=[];
this.Image=this.imagebaseurl+this.data.companies.profileImagePath;
// this.getimage=this.imagebaseurl+data[0].companies.profileImagePath

 this.modalService.open(scrollDataModal, { scrollable: true });
}
copyMessage(){
  this.IsCoppied=true;
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.innerText =this.shareablelink;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}
UpdateConfirm()
{
 
  if(this.file==null)
  {
    this.file=this.Image;
  }
  var companydata={ "Image":this.file,"companyname":this.comapnyName,"address":this.address,"companyId":this.CompanyId}
   
  this.comapnyName="";
  this.address="";
 
  this.companyservice.UpdateCompany(companydata).subscribe((next:any)=>{

    
      this.companyservice.GetCompanyInfo3(this.CompanyId).subscribe((next:any)=>{
        debugger;
        var dat=next.res;
        localStorage.setItem("Companydata",JSON.stringify(dat))
     
      
        this.data=JSON.parse(localStorage.getItem("Companydata"))
        this.CompanyUsers=this.data.customers;
            },error=>{
            
            })
  
     
    this.toastr.success(' Company Updated Successfully!', 'Congrats', {
      titleClass: "center",
      messageClass: "center"
    });
      //this._fetchData();
      this.files=[]
      this.modalService.dismissAll();
    },error=>{
      this.modalService.dismissAll();
      console.log(error)
      this.toastr.error('Something Wrong!', '', {
        titleClass: "center",
        messageClass: "center"
      });
      
    })
  


}

onSelect(event) {
  debugger;
  console.log(event);
  this.files=[]
  this.files.push(...event.addedFiles);
 this.file=this.files[0]

}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
Createlink(Create1: any,Id:number) {

  this.number1= Math.floor(Math.random() * (9999999999999 - 10000 + 1) + 10000);
  debugger;

this.text=Math.random().toString(36).substring(2, 15) +
     Math.random().toString(36).substring(2, 15)
     var data=this.number1+this.text;
     var shuffled = data.split('').sort(function(){return 0.5-Math.random()}).join('');
     var mystring=shuffled+'-'+Id;
     var url=location.origin;
     this.shareablelink=url+'/companyinfo/'+mystring;

debugger;

  this.modalService.open(Create1, {size: 'lg' });
}
getuserinfo(Id:number)
{

localStorage.setItem("UserId",Id.toString())
this.router.navigate(['admin/userdetail']);
}
navigator()
{
  localStorage.setItem("CreateCompany","True")
  this.router.navigate(['/home/admin/companies'])
}
Sort(key){

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

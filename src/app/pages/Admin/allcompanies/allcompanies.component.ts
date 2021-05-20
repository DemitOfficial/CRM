import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GetcompaniesDto } from 'src/app/core/models/GetcompaniesDto';
import { ConpanyService } from 'src/app/core/services/company.service';
import { FiledownloadService } from 'src/app/core/services/filedownload.service';
import { UsersService } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-allcompanies',
  templateUrl: './allcompanies.component.html',
  styleUrls: ['./allcompanies.component.scss']
})
export class AllcompaniesComponent implements OnInit {

  companieslist:GetcompaniesDto []=[];
  totalusers:number;
  UserId:any;
  Userslist:any[]=[];
  key:string='rowid';
    reverse:boolean=false;
    p:number=1;
    term: string;
    no:any;
    data:any[]=[];
    selectedValue =5;
    getdata:any[]=[];
  //end test 
  
    // bread crum data
    breadCrumbItems: Array<{}>;
    // Table data
    tableData: any;
    public selected: any;
    hideme: boolean[] = [];
    
    UsersList:[];
    page=4;
    currentPage = 1;
  itemsPerPage = 5;
  
  file:any;
  image:any;
  comapnyName:string="";
  address:string="";
  Image:string="";
  CompanyId:number;
  getimage:any;
  Create:boolean=false;
  Update:boolean=false;
  Del:boolean=false;
  operationname:string;
  number1:number;
  text:string="";
  baseUrl = environment.apiurl + 'companyinfo/';
  shareablelink:any;
  IsCoppied:boolean=false;
possible:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    public isCollapsed = true;
    @ViewChild('vid',{static:false}) private vid: ElementRef;
  @ViewChild('dismismodal',{static:false}) private modal: ElementRef;
  @ViewChild('openmodal',{static:false}) private openmodal: ElementRef;
  imagebaseurl=environment.imagepath+"CompanyImages/";
    constructor(private toastr:ToastrService,private spinner: NgxSpinnerService,private fileupload:FiledownloadService,private companyservice:ConpanyService,private userservice:UsersService,private modalService: NgbModal,private router:Router) {
      
 
    }
  
    ngOnInit() {
     
      this.data.push(5,10,25,50,100);
      this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Companies', active: true }];
      /**
       * fetch data
       */
       setInterval(() => {
        this.IsCoppied=false;
      }, 5000)
  
      this._fetchData();
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
      debugger;
   localStorage.setItem("UserId",Id.toString())
  this.router.navigate(['admin/userdetail']);
    }
    CompanyInfo(data:any)
    {
      debugger;
      localStorage.setItem("Companydata",JSON.stringify(data))
      this.router.navigate(['/admin/companydetail'])
 
    }
    
  Savecompany()
  {
    debugger;
   this.image=this.file;
   this.spinner.show();
    var companydata={ "Image":this.file,"companyname":this.comapnyName,"address":this.address,"companyId":0}
      this.companyservice.Addcompany(companydata).subscribe((next:any)=>{
        this.spinner.hide();
        this.comapnyName="";
        this.address="";
        this.files=[]
        this.file=null;
        this._fetchData();
        this.toastr.success('New Company Registered Successfully!', 'Congrats', {
          titleClass: "center",
          messageClass: "center"
        });
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
 
  
    Sort(key){
      debugger;
      this.key=key;
      this.reverse=!this.reverse;
    }
    files: File[] = [];

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
    /**
     * Open scroll modal
     * @param scrollDataModal scroll modal data
     */
     scrollModal(scrollDataModal: any,companyId:number,operation:string) {
       debugger;
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
   
      var data=this.companieslist.filter(x=>x.companies.companyId==companyId);
      this.comapnyName="";
      this.address="";
   
      this.comapnyName=data[0].companies.comapnyName;
      this.address=data[0].companies.address;
    this.CompanyId=data[0].companies.companyId;
    this.files=[];
    this.Image=this.imagebaseurl+data[0].companies.profileImagePath;
    // this.getimage=this.imagebaseurl+data[0].companies.profileImagePath
   
      this.modalService.open(scrollDataModal, { scrollable: true });
    }
    Adddata(Addmodal: any) {
      this.modalService.open(Addmodal, { scrollable: true });
    }
    CompanyDetails(Details: any,data:any) {
      this.Userslist=data;
      this.modalService.open(Details, { scrollable: true });
    }
    /**
     * fetches the table value
     */
    _fetchData() {
      debugger;
      this.spinner.show();
      this.companyservice.GetUsersCompanyWise().subscribe((next:any)=>{
        this.UsersList=next.res;
        this.tableData =this.UsersList;
        this.spinner.hide();
        this.companieslist=this.UsersList;
      console.log(this.UsersList)
       
            },error=>{
            
            })
     
    }
    UpdateConfirm()
    {
      debugger;
      if(this.file==null)
      {
        this.file=this.Image;
      }
      var companydata={ "Image":this.file,"companyname":this.comapnyName,"address":this.address,"companyId":this.CompanyId}
       
      this.comapnyName="";
      this.address="";
     
      this.companyservice.UpdateCompany(companydata).subscribe((next:any)=>{
        this.toastr.success(' Company Updated Successfully!', 'Congrats', {
          titleClass: "center",
          messageClass: "center"
        });
          this._fetchData();
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
    DeleteCompany()
    {
      debugger;
  
     this.companyservice.RemoveCompany(this.CompanyId).subscribe((next:any)=>{
      this.comapnyName="";
      this.address="";
      this.files=[]
    this.modalService.dismissAll();
          this._fetchData();
        },error=>{
          this.modalService.dismissAll();
          console.log(error)
        })
      
   
   
    }
  
  
 
}

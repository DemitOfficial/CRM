import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConpanyService } from 'src/app/core/services/company.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { DatashareService } from 'src/app/core/services/datashare.service';
import { environment } from 'src/environments/environment';
import *  as  XLSX from 'xlsx';
import * as fs from 'file-saver';
@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild('vid',{static:false}) private vid: ElementRef;
  @ViewChild('takeInput', {static: false})  InputVar: ElementRef;
  @ViewChild('dismismodal',{static:false}) private modal: ElementRef;
  @ViewChild('openmodal',{static:false}) private openmodal: ElementRef;
  file:any;
  willDownload = false;
  contactlist:any;
  totalcontacts:any;
   UsersList:any[]=[];
  key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data2:any[]=[];
  selectedValue =5;
  Create:boolean=false;
  Update:boolean=false;
  Del:boolean=false;
  operationname:string;
  Name:string;
  contactId:number;
  companyId:number;
  Contact:string;
  Email:string;
  Address:string;
  productlist:any;
  number1:number;
  text:string="";
  customerID:number;
  baseUrl = environment.apiurl + 'contactinfo/';
  imagebaseurl=environment.imagepath+"CompanyImages/";
  shareablelink:any;
   IsUser:boolean=false;
   checked:boolean=false;
selectednumbers:any[]=[];
SelectedValues:any[]=[];
checker:boolean=true;
possible:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
IsCoppied:boolean=false;

fileName1= 'ExcelSheet.xlsx';
@ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private toastr:ToastrService,private spinner: NgxSpinnerService,private contactservice:ContactService,private modalService: NgbModal,private router:Router,private companyservice:ConpanyService,private datashaereservice:DatashareService) { }

  ngOnInit() {
    this.data2.push(5,10,25,50,100);
    this.GetContactList();
    console.log(this.data)
    setInterval(() => {
      this.IsCoppied=false;
    }, 5000)
  }
    AddAllQouted(){
    debugger;
    if(this.SelectedValues.length>0){
      this.SelectedValues=[];
      this.checked=false;
    }
    else{
      for(let i=0;i<this.contactlist.length;i++){
        this.SelectedValues.push(this.contactlist[i].contact.contactId)
     
        
      }
      this.checked=true;
     
    }
    console.log(this.SelectedValues);
  }
  AddQuote(Id:Number)
  {
  debugger;

  var add =this.SelectedValues.includes(Id)
  if(add!=true)
  {

    this.SelectedValues.push(Id)
        
  }else{
    
    var add11 =this.SelectedValues.findIndex(x=>x===Id)
  
      this.SelectedValues.splice(add11,1)
  
   

    var data=this.SelectedValues;
  
  }
console.log(this.SelectedValues);
if(this.SelectedValues.length==this.contactlist.length)
{
  this.checker==true;
}else{
  this.checker=false;
}
  }
 
  getuserinfo(Id:number)
  {
    debugger;
 localStorage.setItem("UserId",Id.toString())
this.router.navigate(['admin/userdetail']);
  }
 
  exportexcel()
  {
    debugger;
    
    const ws: XLSX.WorkSheet =   
    XLSX.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'CrmUsers.xlsx');
  
  
    
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
  UpdateContact(Id:any){
    debugger;
    this.Update=true;
    this.Del=false;
    this.Create=false;
    var data=this.contactlist.filter(x=>x.contact.contactId==Id);
    
    this.operationname="Update Contact No";
    this.Name=data[0].name;
    this.Contact=data[0].phone;
  this.Address=data[0].address;
  this.Email=data[0].email;

  this.contactId=data[0].contactId;
    this.openmodal.nativeElement.click();
  }
  Showmodal()
  {
    this.Create=true;
    this.Del=false;
    this.Update=false;
    this.operationname="Add Contact No";
    this.Name="";
    this.Address="";
    this.Contact="";
    this.Email="";
    this.openmodal.nativeElement.click();
  }

  SaveConfirmContact()
  {
    debugger;
 
    var contactdata={ "Name":this.Name,"Phone":this.Contact,"Email":this.Email,"Address":this.Address,"CompanyId":0}
      this.contactservice.Addcontact(contactdata).subscribe((next:any)=>{
       this.modalService.dismissAll();
       this.toastr.success('Contact Created Successfully', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
        this.GetContactList();
     
        this.Name="";
        this.Address="";
        this.Contact="";
        this.Email="";
      },error=>{
        this.modalService.dismissAll();
        console.log(error)
      })
    
 
 
  }
  UpdateConfirm()
  {
  
  
    var contactdata={ "contactId":this.contactId,"Name":this.Name,"Phone":this.Contact,"Email":this.Email,"Address":this.Address,"CompanyId":this.companyId,"customerID":this.customerID}
    debugger;  
    this.contactservice.UpdateContact(contactdata).subscribe((next:any)=>{
        this.modalService.dismissAll();
        this.IsUser=false;
        this.toastr.success('Contact Updated Successfully', 'Congrats', {
          titleClass: "center",
          messageClass: "center"
        });
        this.Name="";
        this.Address="";
        this.Contact="";
        this.Email="";
    
        this.GetContactList();

      },error=>{
       
        this.modalService.dismissAll();
      
        console.log(error)
      })
    
 
 
  }
  UpdateCustomerConfirm()
  {
  
  
    var contactdata={ "contactId":this.contactId,"Name":this.Name,"Phone":this.Contact,"Email":this.Email,"Address":this.Address,"CompanyId":0}
       this.contactservice.UpdateContact(contactdata).subscribe((next:any)=>{
        this.modalService.dismissAll();
        this.toastr.success('Contact Updated Successfully', 'Congrats', {
          titleClass: "center",
          messageClass: "center"
        });
        this.Name="";
        this.Address="";
        this.Contact="";
        this.Email="";
    
        this.GetContactList();

      },error=>{
       
        this.modalService.dismissAll();
      
        console.log(error)
      })
    
 
 
  }
  DeleteCompany()
  {
    debugger;
    this.Name="";
    this.Address="";
    this.Contact="";
    this.Email="";
   this.contactservice.removecontact(this.contactId).subscribe((next:any)=>{
        this.modalService.dismissAll();
        this.toastr.success('Contact Removed Successfully', 'Congrats', {
          titleClass: "center",
          messageClass: "center"
        });
        this.GetContactList();
      },error=>{
        this.modalService.dismissAll();
        this.toastr.error('Somethings wrong!', 'Sorry!', {
          titleClass: "center",
          messageClass: "center"
        });
        console.log(error)
      })
    
 
 
  }
  Removecontacts()
  {
    debugger
    this.contactservice.DeleteContacts(this.SelectedValues).subscribe((next:any)=>{
    
      this.router.navigate(['/user/quotations'])
      this.toastr.success('Ticked Quoted Successfully!', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
      console.log(next)
      this.toastr.error('Somethings wrong!', 'Sorry!', {
        titleClass: "center",
        messageClass: "center"
      });
          })
  }
  remove()
  {
    this.data=[];
    this.InputVar.nativeElement.value = "";
  }
  data: any = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    debugger
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
    this.file=target.files[0];
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
 var data=XLSX.utils.aoa_to_sheet(this.data);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  Videos: File[] = [];

  onvideoSelect(event) {

 debugger;
      
    this.Videos.splice(this.Videos.indexOf(event), 1);
    this.Videos.push(...event.addedFiles);
    this.vid=event.addedFiles;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();

      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
    const formData = new FormData();
 
    for (var i = 0; i < this.Videos.length; i++) { 
      formData.append("Video[]", this.Videos[i]);
    }


    
  }
  onVideoRemove(event) {
    console.log(event);
    this.Videos.splice(this.Videos.indexOf(event), 1);
  }
  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, { scrollable: true,size: 'lg' });
  };
  Createlink(Create1: any,Id:number) {
  
    this.number1= Math.floor(Math.random() * (9999999999999 - 10000 + 1) + 10000);
    debugger;

 this.text=Math.random().toString(36).substring(2, 15) +
       Math.random().toString(36).substring(2, 15)
       var data=this.number1+this.text;
       var shuffled = data.split('').sort(function(){return 0.5-Math.random()}).join('');
       var mystring=shuffled+'-'+Id;
  
   var url=location.origin;
   this.shareablelink=url+'/contactinfo/'+mystring;
debugger;

    this.modalService.open(Create1, {size: 'lg' });
  }
  
  Createcontact(Create: any) {
    this.Name="";
    this.Address="";
    this.Contact="";
    this.Email="";
    this.modalService.open(Create, { scrollable: true,size: 'lg' });
  }
  CData(ContactData: any,Id:number,operation:string) {
   debugger;
   this.IsUser=false;
    if(operation=="Edit")
    {
      this.Del=false;
    this.Create=false;
    this.Update=true;
    this.Name="";
    this.Address="";
    this.Contact="";
    this.Email="";
    this.operationname="Are You Sure Want to Update this Contact No";
    var data=this.contactlist.filter(x=>x.contact.contactId==Id);
    if(data[0].contact.customerID!=null)
    {
this.customerID=data[0].contact.customerID;
this.companyId=data[0].contact.companyId;
this.IsUser=true;
    }
    this.Name=data[0].contact.name;
    this.contactId=data[0].contact.contactId;
    this.Contact=data[0].contact.phone;
  this.Address=data[0].contact.address;
  this.Email=data[0].contact.email;
    }
    if(operation=="remove")
    {
      this.Del=true;
   
      this.Update=false;
      this.Name="";
      this.Address="";
      this.Contact="";
      this.Email="";
      this.operationname="Are You Sure Want to remove this Contact No";
      var data=this.contactlist.filter(x=>x.contact.contactId==Id);
      
      this.operationname="Remove Contact No";
      if(data[0].contact.customerID!=null)
      {
  this.customerID=data[0].contact.customerID;
  this.IsUser=true;
  this.companyId=data[0].contact.companyId;
      }
      this.contactId=data[0].contactId;
      this.Name=data[0].contact.name;
      this.contactId=data[0].contact.contactId;
      this.Contact=data[0].contact.phone;
    this.Address=data[0].contact.address;
    this.Email=data[0].contact.email;
    }
    this.modalService.open(ContactData, { scrollable: true,size: 'lg' });
  }
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
  }
 
  uploadExcelFile()
  {
    debugger;
    this.contactservice.uploadxlsx(this.file).subscribe((next:any)=>{
      this.modalService.dismissAll();
      this.GetContactList();
      this.toastr.error('Somethings wrong!', 'Sorry!', {
        titleClass: "center",
        messageClass: "center"
      });
    },error=>{
      debugger;
  console.log(error.error);
  this.modalService.dismissAll();
  this.toastr.error('Somethings wrong!', 'Sorry!', {
    titleClass: "center",
    messageClass: "center"
  });
    }
    )
  }

// new upload file

uploadExcel(e,Addmodal: any) {
  
  try{
  
  const fileName = e.target.files[0].name;
  
  import('xlsx').then(xlsx => {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    // const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = xlsx.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = xlsx.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.productlist = jsonData[Object.keys(jsonData)[0]];

      this.modalService.open(Addmodal, { scrollable: true, size: 'xl',windowClass:'modal-holder', centered: true  });
      console.log(this.productlist);
this.file=e.target.files[0]
    };
    reader.readAsBinaryString(e.target.files[0]);
  });

}catch(e){
   console.log('error', e);
}

}
// end file read new 

  GetContactList(){
    this.spinner.show();
    this.contactlist=[];
    this.UsersList=[];
    this.contactservice.Getcontactslist().subscribe((next:any)=>{
  this.contactlist=next.res;
  this.spinner.hide();
  debugger;
  this.contactlist.forEach(element => {
    if(element.contact.customerID==null)
    {
      var obj1={"type":"Contact","name":element.contact.name,"phone":element.contact.phone,"email":element.contact.email,"address":element.contact.address,"contactId":element.contact.contactId};
      this.UsersList.push(obj1);
    }
    
    else if(element.contact.customerID!=null)
    {
      
 
      var obj={"Image":element.image,"type":"User","name":element.contact.name,"phone":element.contact.phone,"email":element.contact.email,"address":element.contact.address,"contactId":element.contact.contactId,"userId":element.customer.userId};
      this.UsersList.push(obj);
    }
  
  
});
  this.totalcontacts=this.contactlist.length;

  console.log(this.UsersList)

  this.data=[];
 
      },error=>{
      
      })

  }

}

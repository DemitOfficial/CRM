import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageServiceService } from 'src/app/core/services/MessageService.service';

@Component({
  selector: 'app-createemail',
  templateUrl: './createemail.component.html',
  styleUrls: ['./createemail.component.scss']
})
export class CreateemailComponent implements OnInit {

  contactlist:any[]=[];
  totalcontacts:any;
  Message:string="";
  Subject:string="";
 SelectedValues:any[]=[];
 key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data:any[]=[];
  selectedValue =5;
  checked:boolean=false;
 selectednumbers:any[]=[];
 breadCrumbItems: Array<{}>;
 date:Date; 
  constructor(private router:Router,private toastr:ToastrService,private spinner: NgxSpinnerService,private contactservice:ContactService,private messageservice:MessageServiceService) { }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.breadCrumbItems = [{ label: 'Emails' }, { label: 'Inbox', active: true }];
    this.data.push(5,10,25,50,100);
    this.GetContactList();
  }
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
  }
 
  Addallmails(){
    debugger;
    if(this.SelectedValues.length>0){
      this.SelectedValues=[];
      this.checked=false;
    }
    else{
      for(let i=0;i<this.contactlist.length;i++){
        this.SelectedValues.push(this.contactlist[i].contact.contactId)
        this.selectednumbers.push(this.contactlist[i].contact.email)
        
      }
      this.checked=true;
    }
  }
  Addmail(Id:Number,email:string)
  {
  debugger;
  var checker=this.SelectedValues.filter(x=>Id)
  if(checker.length==0)
  {
    this.selectednumbers.push(email)
    this.SelectedValues.push(Id)
        
  }else{
    this.SelectedValues.splice(checker[0],1)
    var data=this.SelectedValues;
  }

  }

  GetContactList(){
    this.spinner.show();
    this.contactservice.Getcontactslist().subscribe((next:any)=>{
  this.contactlist=next.res;
  this.spinner.hide();
  this.totalcontacts=this.contactlist.length;

debugger;

      },error=>{
      
      })

  }

  SendMessage()
  {
    debugger;
    var data={"Message":this.Message,"Subject":this.Subject,"contactId":this.SelectedValues,"email":this.selectednumbers}
    console.log(data);
 
    this.Message="";
    this.Subject="";
    this.messageservice.PostEmaile(data).subscribe((next:any)=>{
      this.toastr.success('Emails Sends Successfully', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
      this.router.navigate(['/admin/emails'])

    },error=>{
      this.toastr.error('Something Wrong!', '', {
        titleClass: "center",
        messageClass: "center"
      });
this.Message="";
this.Subject="";
this.selectednumbers=[];
this.SelectedValues=[];
    })
  }
}

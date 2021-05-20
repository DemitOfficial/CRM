import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/core/services/contact.service';
import { MessageServiceService } from 'src/app/core/services/MessageService.service';

@Component({
  selector: 'app-createmessage',
  templateUrl: './createmessage.component.html',
  styleUrls: ['./createmessage.component.scss']
})
export class CreatemessageComponent implements OnInit {


  contactlist:any;
  totalcontacts:any;
  Message:string="";
 SelectedValues:any[]=[];
 selectednumbers:any[]=[];
 checked:boolean=false;
 key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data:any[]=[];
  selectedValue=5;
  breadCrumbItems: Array<{}>;
  date:Date; 
  constructor(private toastr:ToastrService,private router:Router,private spinner: NgxSpinnerService,private contactservice:ContactService,private messageservice:MessageServiceService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Messages' }, { label: 'Create New Message', active: true }];
    this.data.push(5,10,25,50,100);
    this.GetContactList();
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  
  }
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
  }
  AddAllNumber(){
    debugger;
    if(this.SelectedValues.length>0){
      this.SelectedValues=[];
      this.checked=false;
    }
    else{
      for(let i=0;i<this.contactlist.length;i++){
        this.SelectedValues.push(this.contactlist[i].contact.contactId)
        this.selectednumbers.push(this.contactlist[i].contact.phone)
        
      }
      this.checked=true;
    }
  }
  AddNumber(Id:Number,contactno:string)
  {
  debugger;
  var checker=this.SelectedValues.filter(x=>Id)
  if(checker.length==0)
  {
    this.selectednumbers.push(contactno)
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
    var data={"Message":this.Message,"contactId":this.SelectedValues,"number":this.selectednumbers}
    console.log(data);

    this.Message="";
    this.messageservice.PostMessage(data).subscribe((next:any)=>{

this.toastr.success('Emails Sends Successfully', 'Congrats', {
  titleClass: "center",
  messageClass: "center"
});
this.router.navigate(['/admin/messages'])

    },error=>{
      this.toastr.error('Something Wrong!', '', {
        titleClass: "center",
        messageClass: "center"
      });
this.Message="";
this.selectednumbers=[];
this.SelectedValues=[];
    })
  }


}

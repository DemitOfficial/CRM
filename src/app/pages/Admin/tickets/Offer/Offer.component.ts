import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TicketService } from 'src/app/core/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Offer',
  templateUrl: './Offer.component.html',
  styleUrls: ['./Offer.component.scss']
})
export class OfferComponent implements OnInit {

  key:string='rowid';
  reverse:boolean=false;
  p:number=1;

  term: string;
 
  no:any;
  data:any[]=[];

  ticketdata:any[]=[];
  Offertickets:any[]=[];

  selectedValue=7;
  breadCrumbItems: Array<{}>;
  number1:number;
  text:string="";
  baseUrl = environment.apiurl + 'companyinfo/';
  shareablelink:any;
possible:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
IsCoppied:boolean=false;
  constructor(private modalService: NgbModal,private spinner: NgxSpinnerService,private ticketservice:TicketService,private router:Router) { }

  ngOnInit() {
    this.data.push(5,10,25,50,100);
    this.breadCrumbItems = [{ label: 'Tickets' }, { label: 'Offer Tickets', active: true }];
    this.Alltickets();
    setInterval(() => {
      this.IsCoppied=false;
    }, 5000)
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
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
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
       this.shareablelink=url+'/ticketinfo/'+mystring;
debugger;

    this.modalService.open(Create1, { size: 'lg' });
  }
  ticketreply(Id:Number)
  {
    debugger;
   var data=this.ticketdata.filter(x=>x.ticketinfo.ticketId==Id);
   localStorage.setItem("TicketData",JSON.stringify(data))
   this.router.navigate(['/admin/ticketreply'])
  }
  getuserinfo(Id:number)
  {
    debugger;
 localStorage.setItem("UserId",Id.toString())
this.router.navigate(['/admin/userdetail']);
  }
  ticketdetail(Id:Number)
  {
    debugger;
   var data=this.ticketdata.filter(x=>x.ticketinfo.ticketId==Id);
   localStorage.setItem("TicketData",JSON.stringify(data))
  //  localStorage.setItem("UserInfo",JSON.stringify())
   this.router.navigate(['/admin/ticketdetail'])
  }
  Alltickets()
  {  
    this.spinner.show();
    this.ticketservice.getAlltickets().subscribe((next:any)=>{
      debugger;
      this.spinner.hide();
      this.ticketdata=next.res;
      this.Offertickets=this.ticketdata.filter(x=>x.ticketType.ticketName=="Offer or Inquires");
      console.log(this.ticketdata)
     
          },error=>{
          
          })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ticket } from 'src/app/core/models/ticket';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-Createticket',
  templateUrl: './Createticket.component.html',
  styleUrls: ['./Createticket.component.scss']
})
export class CreateticketComponent implements OnInit {


  funneldata:any[]=[];
  tickettypes:any[]=[];
  tickettypeid:number=0;
  rfq:boolean=false;
  offer:boolean=false;
  tickettoshow:any[]=[]
  askingprice:boolean=false;
  selecttype:any[]=[];
  quotenum:boolean=false;
  offerprice:boolean=false;
  OpenTickets:any[]=[]
  gettickets:any[]=[]
  


    constructor(private modalService: NgbModal,private spinner: NgxSpinnerService,private ticketmodal:Ticket,private ticketservice:TicketService,private router:Router) { }
  
    ngOnInit() {
      
      this.ticketservice.GetFunnel().subscribe((next:any)=>{
        this.funneldata=next;
        console.log(next)
      },error=>{
        console.log(error)
      })
      this.ticketservice.GetUserTicket().subscribe((next:any)=>{
  this.gettickets=next.res
  console.log(this.gettickets)
      })
    }
    ticketForm:FormGroup=new FormGroup({
     
      TicketTypeId: new FormControl(this.ticketmodal.TicketTypeId),
    
   
       Priority: new FormControl(this.ticketmodal.Priority),
      //  RFQnum: new FormControl(this.ticketmodal.RFQnum),
      //  Offernum: new FormControl(this.ticketmodal.Offernum),
      //  PIN: new FormControl(this.ticketmodal.PN),
       Description: new FormControl(this.ticketmodal.Description),
       Cond: new FormControl(this.ticketmodal.Cond),
       Qty: new FormControl(this.ticketmodal.Qty),
       AskingPrice: new FormControl(this.ticketmodal.AskingPrice),
       OfferPrice: new FormControl(this.ticketmodal.OfferPric),
       Notes: new FormControl(this.ticketmodal.Notes),
      //  QuoteNumber: new FormControl(this.ticketmodal.QuoteNumber),
  
  
     });
     ticketreply(Id:Number)
     {
       debugger;
      var data=this.gettickets.filter(x=>x.ticketinfo.ticketId==Id);
      localStorage.setItem("TicketData",JSON.stringify(data))
      this.router.navigate(['user/ticketreply'])
     }
     onOptionsSelected(value){
       var data= this.funneldata.filter(x=>x.funnel.funnerlId==value);
       debugger;
      this.tickettypes=data[0].tickettype;
     }
     ontypeSelected(value:any){
      var data=this.tickettypes.filter(x=>x.ticketTypeId==value);
      this.tickettypeid=parseInt(value);
      console.log(this.tickettypeid)
      if(data[0].ticketName=="RFQ"){
        this.rfq=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.quotenum=false;
      }
      if(data[0].ticketName=="Offer or Inquires"){
        this.rfq=false;
        this.askingprice=false;
        this.offer=true;
        this.offerprice=true;
        this.quotenum=false;
      }
      if(data[0].ticketName=="Quoted Parts"){
        this.quotenum=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.rfq=false;
      }
      if(data[0].ticketName=="Sales Stock"){
        this.quotenum=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.rfq=false;
      }
     }
     keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !=8&&!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
     saveTicket(){
      debugger;
      this.spinner.show();
       this.ticketForm.get('TicketTypeId').patchValue(this.tickettypeid)
       console.log(this.ticketForm.value);
       this.ticketservice.PostTicket(this.ticketForm.value).subscribe((next:any)=>{


  this.modalService.dismissAll();
  this.spinner.hide();
 window.location.reload();
       },error=>{
         console.log(error)
       })
     }
     onFunnelSelected(value){
      var data= this.funneldata.filter(x=>x.funnel.funnerlId==value);
      debugger;
     this.selecttype=data[0].tickettype;
     }
     onticketypeSelected(value){
       debugger;
       this.onTicketTypeSelected(value);
       var datata=this.gettickets;
       var data=this.gettickets.filter(x=>x.ticketinfo.ticketTypeId==value);
       this.tickettoshow=data;
  this.opentickets(value);
       console.log(this.tickettoshow)
     }
     onTicketTypeSelected(value){
       debugger
      var data=this.selecttype.filter(x=>x.ticketTypeId==value);
      this.tickettypeid=parseInt(value);
      console.log(this.tickettypeid)
      if(data[0].ticketName=="RFQ"){
        this.rfq=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.quotenum=false;
      }
      if(data[0].ticketName=="Offer or Inquires"){
        this.rfq=false;
        this.askingprice=false;
        this.offer=true;
        this.offerprice=true;
        this.quotenum=false;
      }
      if(data[0].ticketName=="Quoted Parts"){
        this.quotenum=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.rfq=false;
      }
      if(data[0].ticketName=="Sales Stock"){
        this.quotenum=true;
        this.askingprice=true;
        this.offer=false;
        this.offerprice=false;
        this.rfq=false;
      }
     }
     opentickets(value){
      var data=this.gettickets.filter(x=>x.ticketTypeId==value&&x.status=="Open");
       this.OpenTickets=data;
     }

}

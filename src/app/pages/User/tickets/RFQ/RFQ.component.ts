import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/core/models/ticket';
import { QuotationsService } from 'src/app/core/services/quotations.service';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-RFQ',
  templateUrl: './RFQ.component.html',
  styleUrls: ['./RFQ.component.scss']
})
export class RFQComponent implements OnInit {

  funneldata:any[]=[];
  gettickets:any[]=[]
  key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  tickettypes:any[]=[];
  tickettypeid:number=0;
  rfq:boolean=false;
  offer:boolean=false;
  tickettoshow:any[]=[]
  askingprice:boolean=false;
  selecttype:any[]=[];
  quotenum:boolean=false;
  offerprice:boolean=false;
  OpenTickets:any[]=[];
  getid:any;
  checked:boolean=false;
selectednumbers:any[]=[];
SelectedValues:any[]=[];
ticketlist:any[]=[];
  constructor(private toastr:ToastrService,private ticketmodal:Ticket,private modalService: NgbModal,private quotationsService:QuotationsService,private ticketservice:TicketService,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getticketinfo();
    this.ticketservice.GetFunnel().subscribe((next:any)=>{
      debugger;
      this.funneldata=next;
      var data=this.funneldata[1].tickettype;
      debugger;
       this.getid=data.filter(x=>x.ticketName=="RFQ");
      console.log(this.getid.ticketTypeId);
    },error=>{
      console.log(error)
    })
 
  }
  
  AddAllQouted(){
    debugger;
    if(this.SelectedValues.length>0){
      this.SelectedValues=[];
      this.checked=false;
    }
    else{
      for(let i=0;i<this.gettickets.length;i++){
        this.SelectedValues.push(this.gettickets[i].ticketinfo.ticketId)
     
        
      }
      this.checked=true;
    }
    console.log(this.SelectedValues);
  }
  AddQuote(Id:Number)
  {
  debugger;
  var checker=this.SelectedValues.filter(x=>Id)
  if(checker.length==0)
  {

    this.SelectedValues.push(Id)
        
  }else{
    this.SelectedValues.splice(checker[0],1)
    var data=this.SelectedValues;
  }
console.log(this.SelectedValues);
  }
  AddQuotation()
  {
    debugger
    this.quotationsService.AddQuotation(this.SelectedValues).subscribe((next:any)=>{
      this.toastr.success('Ticked Quoted Successfully!', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
      this.router.navigate(['/user/quotations'])
      console.log(next)

          })
  }
  ticketreply(Id:Number)
  {
    debugger;
   var data=this.gettickets.filter(x=>x.ticketinfo.ticketId==Id);
   localStorage.setItem("TicketData",JSON.stringify(data))
   this.router.navigate(['/user/ticketreply'])
  }
  getticketinfo()
  {
    this.spinner.show()
    this.ticketservice.GetUserRfqTickets().subscribe((next:any)=>{
      this.gettickets=next.res;
      this.spinner.hide()
      this.funneldata=next;
      debugger;
      var data=this.funneldata[1].tickettype;
      debugger;
       this.getid=data.filter(x=>x.ticketName=="RFQ");
    
      console.log(this.gettickets)
          })
  }
   // Ticket Create Start
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
   ticketupdateForm:FormGroup=new FormGroup({
     
    TicketTypeId: new FormControl(this.ticketmodal.TicketTypeId),
     Priority: new FormControl(this.ticketmodal.Priority),
      RFQnum: new FormControl(this.ticketmodal.RFQnum),
    TicketStatus: new FormControl(this.ticketmodal.TicketStatus),
    Status: new FormControl(this.ticketmodal.Status),
    CreationDate: new FormControl(this.ticketmodal.CreationDate),
     Description: new FormControl(this.ticketmodal.Description),
     Cond: new FormControl(this.ticketmodal.Cond),
     Offernum: new FormControl(this.ticketmodal.Offernum),
     Qty: new FormControl(this.ticketmodal.Qty),
     PN: new FormControl(this.ticketmodal.PN),
     AskingPrice: new FormControl(this.ticketmodal.AskingPrice),
     OfferPrice: new FormControl(this.ticketmodal.OfferPric),
     Notes: new FormControl(this.ticketmodal.Notes),
     CustomerId: new FormControl(0),
    
     TicketId: new FormControl(0),
      QuoteNumber: new FormControl(this.ticketmodal.QuoteNumber),


   });
   Edit(Update: any,Id:any) {
    debugger;
  
    var data=this.gettickets.filter(x=>x.ticketinfo.ticketId==Id);
    this.ticketupdateForm.setValue({
    
      TicketTypeId:data[0].ticketinfo.ticketTypeId,
      Priority:data[0].ticketinfo.priority,
      Qty:data[0].ticketinfo.qty,
      OfferPrice:data[0].ticketinfo.offerPrice,
      Notes:data[0].ticketinfo.notes,
      AskingPrice:data[0].ticketinfo.askingPrice,
      Cond:data[0].ticketinfo.cond,
      Description:data[0].ticketinfo.description,
      Offernum:data[0].ticketinfo.offernum,
    
     TicketStatus:data[0].ticketinfo.ticketStatus,
     Status:data[0].ticketinfo.status,
     CreationDate:data[0].ticketinfo.creationDate,
      PN:data[0].ticketinfo.pn,
    
      CustomerId:data[0].ticketinfo.customerId,
    
       QuoteNumber:data[0].ticketinfo.quoteNumber,
       RFQnum:data[0].ticketinfo.rfQnum,
       TicketId:data[0].ticketinfo.ticketId
   });

     this.modalService.open(Update, { scrollable: true,size: 'lg' });
   }
   
   deleteticket(Id:any)
   {
     debugger;
 
    this.ticketservice.removeticket(22).subscribe((next:any)=>{
      this.getticketinfo();
       },error=>{
      
         console.log(error)
       })
     
  
  
   }
   updateConfirm(){
   
    this.spinner.show();

     this.ticketservice.updateticket(this.ticketupdateForm.value).subscribe((next:any)=>{
this.getticketinfo();
this.toastr.success('Ticket Updated Successfully!', 'Congrats', {
  titleClass: "center",
  messageClass: "center"
});
this.modalService.dismissAll();
this.spinner.hide();
     },error=>{
       this.toastr.error('Somethings wrong!', 'Sorry!', {
        titleClass: "center",
        messageClass: "center"
      });
     })
   }
   Createcontact(Create: any) {
    debugger;
     this.modalService.open(Create, { scrollable: true,size: 'lg' });
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
 
   }
   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !=8&&!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  AddQuotation1(Id:number)
  {
    debugger
    this.SelectedValues.push(Id);

    this.quotationsService.AddQuotation(this.SelectedValues).subscribe((next:any)=>{
    
      this.router.navigate(['/user/quotations'])
      this.toastr.success('Ticked Quoted Successfully!', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
      console.log(next)
   
          })
  }
   saveTicket(){
    debugger;
    this.spinner.show();
    var data=this.getid;
    var tickettypeidi=data[0].ticketTypeId
     this.ticketForm.get('TicketTypeId').patchValue(tickettypeidi)
     console.log(this.ticketForm.value);
     this.ticketservice.PostTicket(this.ticketForm.value).subscribe((next:any)=>{
this.getticketinfo();
this.toastr.success('Ticket Created Successfully!', 'Congrats', {
  titleClass: "center",
  messageClass: "center"
});
this.modalService.dismissAll();
this.spinner.hide();

     },error=>{
      this.toastr.error('Somethings wrong!', 'Sorry!', {
        titleClass: "center",
        messageClass: "center"
      });
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
  //Ticket Create End

}

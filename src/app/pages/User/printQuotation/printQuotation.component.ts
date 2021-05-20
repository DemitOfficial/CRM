import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printQuotation',
  templateUrl: './printQuotation.component.html',
  styleUrls: ['./printQuotation.component.scss']
})
export class PrintQuotationComponent implements OnInit {
Quotationdata:any;
Customerdata:any;
Sum:number=0;
qty:number=0;
Date:any;
Quotation:any[]=[];

  constructor() { }

  ngOnInit() {
    debugger;
    this.Quotationdata=JSON.parse(localStorage.getItem("Quotationdata"))
    this.Customerdata=this.Quotationdata[0].qoutation.customer;
    // this.Date=this.Quotationdata[0].quotation.dateTime;

    debugger;
    this. Quotationdata[0].quoteditems.forEach(element => {
      debugger;
     if(element.ticket.askingPric!=0)
     {
      this.qty=this.qty+element.ticket.qty;
      this.Sum=this.Sum+element.ticket.askingPrice*element.ticket.qty;
      var obj={"Id":element.ticket.ticketId,"Description":element.ticket.description,"Condition":element.ticket.cond,"notes":element.ticket.notes,"Qty":element.ticket.qty,"Status":element.ticket.status,"Unitprice":element.ticket.askingPrice,"TotalPrice":element.ticket.askingPrice*element.ticket.qty}
      this.Quotation.push(obj);
     }else{
      this.qty=this.qty+element.ticket.qty;
      this.Sum=this.Sum+element.ticket.offerPrice*element.ticket.qty;
      var obj1={"Id":element.ticket.ticketId,"Description":element.ticket.description,"notes":element.ticket.notes,"Condition":element.ticket.cond,"Qty":element.ticket.qty,"Status":element.ticket.status,"Unitprice":element.ticket.offerPrice,"TotalPrice":element.ticket.offerPrice*element.ticket.qty}
      this.Quotation.push(obj1);

     }
   
    
      console.log(obj);
});

  }

}

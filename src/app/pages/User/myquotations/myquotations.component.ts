import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { Getticketsdto } from 'src/app/core/models/getticketsdto';
import { QuotationsService } from 'src/app/core/services/quotations.service';

@Component({
  selector: 'app-myquotations',
  templateUrl: './myquotations.component.html',
  styleUrls: ['./myquotations.component.scss']
})
export class MyquotationsComponent implements OnInit {

 
myqutations:any[]=[];
key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data:any[]=[];
  selectedValue =5;
  Quotationdata:any;
  Customerdata:any;
  Sum:number=0;
  qty:number=0;
  Date:any;
  Quotation:any[]=[];
  constructor(private renderer: Renderer2,private router:Router,private spinner: NgxSpinnerService,private quotationsService:QuotationsService) { }

  ngOnInit() {
    this.data.push(5,10,25,50,100);

    this.spinner.show()
    this.quotationsService.MyQuotations().subscribe((next:any)=>{
      debugger;
      this.myqutations=next.res;
      this.spinner.hide()
      console.log(this.myqutations)
     
          },error=>{
            console.log(error)
          })
  }
  page()
  {
    var data=this.no;
  }

  public openPDF(Id):void {
    this.renderer.addClass(document.body, 'bodyy');
    this.Quotationdata=this.myqutations.filter(x=>x.qoutation.quotationId==Id);
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

    
    let DATA = document.getElementById('htmlData');
        
    // html2canvas(DATA).then(canvas => {
        
    //     let fileWidth = 208;
    //     let fileHeight = canvas.height * fileWidth / canvas.width;
        
    //     const FILEURI = canvas.toDataURL('image/png')
    //     let PDF = new jsPDF('p', 'mm', 'a4');
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
    //     PDF.save('Quotation.pdf');
    // }); 
    this.renderer.addClass(document.body, 'bodyy');    
    }
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
  }
  PrintQutation(Id:number)
  {
    debugger;
    var data=this.myqutations.filter(x=>x.qoutation.quotationId==Id);
    localStorage.setItem("Quotationdata",JSON.stringify(data))
    this.router.navigate(['/user/print'])
  }


  // test 

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


  // public downloadAsPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const pdfTable = this.pdfTable.nativeElement;

  //   // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //   //   width: 190,
  //   //   'elementHandlers': specialElementHandlers
  //   // });

  //   doc.save('tableToPdf.pdf');
  // }

  //test end

}

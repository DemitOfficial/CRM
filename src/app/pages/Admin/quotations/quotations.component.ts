import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { QuotationsService } from 'src/app/core/services/quotations.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {

 

 
myqutations:any[]=[];
key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data:any[]=[];
  selectedValue =5;
 
  constructor(private router:Router,private spinner: NgxSpinnerService,private quotationsService:QuotationsService) { }

  ngOnInit() {
    this.data.push(5,10,25,50,100);

    this.spinner.show()
    this.quotationsService.AllQuotations().subscribe((next:any)=>{
      debugger;
      this.myqutations=next.res;
      this.spinner.hide()
      console.log(this.myqutations)
     
          },error=>{
            console.log(error)
          })
  }
    
  getuserinfo(Id:number)
  {
    debugger;
 localStorage.setItem("UserId",Id.toString())
this.router.navigate(['admin/userdetail']);
  }
  page()
  {
    var data=this.no;
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
    this.router.navigate(['/admin/print'])
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

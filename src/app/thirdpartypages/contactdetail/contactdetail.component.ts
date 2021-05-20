import { ContactService } from 'src/app/core/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.scss']
})
export class ContactdetailComponent implements OnInit {

  
  
 
CopntactData:any;
userinfo:any[]=[];
data:any[]=[];
ContactId:number;
year: number = new Date().getFullYear();
  constructor(private ContactService:ContactService,private route: ActivatedRoute) { }
  // ,private route: ActivatedRoute
  ngOnInit() {
    debugger;
    var da= this.route.snapshot.params['mystring'];
    var dd=da.split('-');
  
    this.ContactId=dd[1]
    this.Info(Number(this.ContactId));
  }
  Info(Id:Number)
  {
    this.ContactService.GetCOntactInfo3(Id).subscribe((next:any)=>{
      debugger;
      this.CopntactData=next.res;
     
   
      console.log(this.CopntactData)
     
          },error=>{
          
          })

   }

}

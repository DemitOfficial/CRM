import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ticketdetail',
  templateUrl: './ticketdetail.component.html',
  styleUrls: ['./ticketdetail.component.scss']
})
export class TicketdetailComponent implements OnInit {

  
 
ticketdata:any;
userinfo:any[]=[];
data:any[]=[];
TicketId:number;
year: number = new Date().getFullYear();
  constructor(private ticketservice:TicketService,private route: ActivatedRoute) { }
  // ,private route: ActivatedRoute
  ngOnInit() {
    debugger;
   
    var da= this.route.snapshot.params['mystring'];
    var dd=da.split('-');
  
    this.TicketId=dd[1]
    this.Info(Number(this.TicketId));
  }
  Info(Id:Number)
  {
    this.ticketservice.Thirdpartyticketinfo(Id).subscribe((next:any)=>{
      debugger;
      this.ticketdata=next.res;
     
   
      console.log(this.ticketdata)
     
          },error=>{
          
          })

   }
  

}

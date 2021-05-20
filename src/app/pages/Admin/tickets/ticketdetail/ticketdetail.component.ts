import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticketdetail',
  templateUrl: './ticketdetail.component.html',
  styleUrls: ['./ticketdetail.component.scss']
})
export class TicketdetailComponent implements OnInit {

 
ticketdata:any;
userinfo:any[]=[];
data:any[]=[];
imagebaseurl=environment.imagepath+"ReplyTicketDocuments/";
  constructor(private spinner: NgxSpinnerService,private router:Router) { }

  ngOnInit() {
 
     this.data=JSON.parse(localStorage.getItem("TicketData"))
    this.ticketdata=this.data[0]
    this.userinfo=JSON.parse(localStorage.getItem("UserInfo"))

    console.log(this.ticketdata)
  }
  ticketreply(Id:Number)
  {
    debugger;
   var data=this.data.filter(x=>x.ticketinfo.ticketId==Id);
   localStorage.setItem("TicketData",JSON.stringify(data))
   this.router.navigate(['/home/admin/ticketreply'])
  }

}

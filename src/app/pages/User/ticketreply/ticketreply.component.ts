import { Component, OnInit } from '@angular/core';
import { Ticketreply } from 'src/app/core/models/ticketreply';
import { TicketService } from 'src/app/core/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticketreply',
  templateUrl: './ticketreply.component.html',
  styleUrls: ['./ticketreply.component.scss']
})
export class TicketreplyComponent implements OnInit {

 
 
  retriveticketdata:any;
  TicketId:number;
  Message:string="";
  uploadFile:any;
  Ticketreplies:Ticketreply[];
  breadCrumbItems: Array<{}>;
  imagebaseurl=environment.imagepath+"ReplyTicketDocuments/";
    constructor(private ticketservice:TicketService) { }
  
    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Ticket' }, { label: 'Ticket Replies', active: true }];
   var getdata=JSON.parse(localStorage.getItem("TicketData"))
   this.retriveticketdata=getdata[0];
   console.log(this.retriveticketdata)
  
   var data=this.retriveticketdata.description;
   this.getticketReplies(this.retriveticketdata.ticketinfo.ticketId);
    }
    onFileChange(evt: any) {
       const target: DataTransfer = <DataTransfer>(evt.target);
         this.uploadFile=target.files[0];
    }
  getticketReplies(Id:number)
  {
    debugger;
  
    this.Message=""
    this.ticketservice.GetTicketRepliesByAdmin(Id).subscribe((next:any)=>{
      this.Ticketreplies=next.res;
    
      console.log(this.Ticketreplies)
    },error=>{
      console.log(error)
    })
  
  }
    SubmitReply()
    {
      debugger;
      var data={'Message':this.Message,"DocumentPath":this.uploadFile,"TicketId":Number(this.retriveticketdata.ticketinfo.ticketId),}
  
        this.ticketservice.Replyticket(data).subscribe((next:any)=>{
          this.getticketReplies(this.retriveticketdata.ticketinfo.ticketId);
        },error=>{
          this.getticketReplies(this.retriveticketdata.ticketinfo.ticketId);
          this.Message=""
          this.uploadFile=""
          console.log(error)
        })
      
   
   
    }

}

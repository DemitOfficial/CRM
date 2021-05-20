import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageServiceService } from 'src/app/core/services/MessageService.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

 
messages:any[]=[]
key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term:string;
  no:any;
  data:any[]=[];
  selectedValue =15;
  getdata:any[]=[];
  breadCrumbItems: Array<{}>;
  constructor(private spinner: NgxSpinnerService,private messageservice:MessageServiceService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Messages' }, { label: 'Inbox', active: true }];
    this.data.push(5,10,25,50,100);
    this.spinner.show();
    this.messageservice.GetMessage().subscribe((next:any)=>{
      this.messages=next.res;
      this.spinner.hide();
    },error=>{
      console.log(error);
    })
  }

}

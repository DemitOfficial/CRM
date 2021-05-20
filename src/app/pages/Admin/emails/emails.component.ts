import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageServiceService } from 'src/app/core/services/MessageService.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {
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
      debugger;
      this.breadCrumbItems = [{ label: 'Emails' }, { label: 'Inbox', active: true }];
      this.data.push(5,10,25,50,100);
      this.spinner.show();
      this.messageservice.GetEmailMessage().subscribe((next:any)=>{
        this.messages=next.res;
        this.spinner.hide();
        console.log(this.messages)
      },error=>{
        console.log(error);
      })
    }

}

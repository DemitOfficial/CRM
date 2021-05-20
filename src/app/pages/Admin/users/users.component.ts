import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/auth.models';
import { ConpanyService } from 'src/app/core/services/company.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { DatashareService } from 'src/app/core/services/datashare.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  UsersList:any[]=[];
totalusers:number;
UserId:any;
UserData:User[]=[];
key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  term: string;
  no:any;
  data:any[]=[];
  selectedValue =5;
  getdata:any[]=[];
  breadCrumbItems: Array<{}>;


  contactlist:any;
  constructor(private contactservice:ContactService,private toastr:ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private router:Router,private companyservice:ConpanyService,private datashaereservice:DatashareService) { }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Users', active: true }];
    this.data.push(5,10,25,50,100);
    this.getregisterusers();

  }
  
  getuserinfo(Id:number)
  {
    debugger;
 localStorage.setItem("UserId",Id.toString())
this.router.navigate(['admin/userdetail']);
  }
  Sort(key){
    debugger;
    this.key=key;
    this.reverse=!this.reverse;
  }

   
    
  DeleteUser(Id:number)
  {
    debugger;

   this.companyservice.removeuser(Id).subscribe((next:any)=>{

    this.toastr.success('User Removed Successfully!', 'Congrats', {
      titleClass: "center",
      messageClass: "center"
    })
        this.getregisterusers();
      },error=>{
        this.toastr.error('Somethings wrong!', 'Sorry!', {
          titleClass: "center",
          messageClass: "center"
        });
        console.log(error)
      })
    
 
 
  }
  userform:FormGroup=new FormGroup({
     
    companyid:new FormControl(0),
contact:new FormControl(""),
customerId:new FormControl(0),
email: new FormControl(""),
name:new FormControl(""),
password:new FormControl("")
   });

   Edit(Update: any,userId:number) {
    debugger;
  
    var data=this.UsersList.filter(x=>x.user.userId==userId);
    this.userform.setValue({
    
      companyid:data[0].user.companyid,
      contact:data[0].user.contact,
      customerId:data[0].user.customerId,
      email:data[0].user.email,
      name:data[0].user.name,
      password:data[0].user.password,
   
   });
   this.modalService.open(Update, { scrollable: true,size: 'lg' });
  }

  updateConfirm(){
   
//     this.spinner.show();

//      this.ticketservice.updateticket(this.userform.value).subscribe((next:any)=>{
// this.getticketinfo();
// this.toastr.success('Ticket Updated Successfully!', 'Congrats', {
//   titleClass: "center",
//   messageClass: "center"
// });
// this.modalService.dismissAll();
// this.spinner.hide();
//      },error=>{
//       this.toastr.error('Somethings wrong!', 'Sorry!', {
//         titleClass: "center",
//         messageClass: "center"
//       });
//      })
   }

  downloadFile(UsersList: Blob) { 
    const contentType = 'application/vnd.openxmlformats-ficedocument.spreadsheetml.sheet'; 
    const blob = new Blob([UsersList], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  getregisterusers()
  {
    this.spinner.show();
          this.companyservice.GetAllUsers().subscribe((next:any)=>{
            this.UsersList=next.res;
            this.spinner.hide();
            console.log(this.UsersList)
            this.totalusers=this.UsersList.length; 
        
                },error=>{
                
                })
        
   
  }

  
}

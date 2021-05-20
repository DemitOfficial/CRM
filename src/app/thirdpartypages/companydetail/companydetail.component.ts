import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConpanyService } from 'src/app/core/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss']
})
export class CompanydetailComponent implements OnInit {

 
  
  
 
CompanytData:any;
userinfo:any[]=[];
data:any[]=[];
ContactId:number;
year: number = new Date().getFullYear();
imagebaseurl=environment.imagepath+"CompanyImages/";
customers:any;
  constructor(private companyservice:ConpanyService,private route: ActivatedRoute) { }
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
    this.companyservice.GetCompanyInfo3(Id).subscribe((next:any)=>{
      debugger;
      this.CompanytData=next.res;
     this.customers=next.res.customers;
   
      console.log(this.customers)
     
          },error=>{
          
          })

   }


}

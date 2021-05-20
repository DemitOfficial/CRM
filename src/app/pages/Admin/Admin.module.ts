import { AllticketsComponent } from './tickets/Alltickets/Alltickets.component';


import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AdminRoutingModule } from './adminrouting.routing';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { CreateemailComponent } from './createemail/createemail.component';
import { CreatemessageComponent } from './createmessage/createmessage.component';
import { EmailsComponent } from './emails/emails.component';
import { MessagesComponent } from './messages/messages.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { UsersComponent } from './users/users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination'
import { AllcompaniesComponent } from './allcompanies/allcompanies.component';
import { RFQComponent } from './tickets/RFQ/RFQ.component';
import { StockComponent } from './tickets/stock/stock.component';
import { OfferComponent } from './tickets/Offer/Offer.component';
import { QuotedComponent } from './tickets/Quoted/Quoted.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TicketreplyComponent } from './tickets/ticketreply/ticketreply.component';
import { TicketdetailComponent } from './tickets/ticketdetail/ticketdetail.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrintquotationadminComponent } from './printquotationadmin/printquotationadmin.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    AdminRoutingModule,
  
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    NgxPrintModule,
    NgxSpinnerModule,
    
Ng2OrderModule,
Ng2SearchPipeModule,
NgxDropzoneModule,
CommonModule,
FormsModule,
ReactiveFormsModule,
NgbAlertModule,
NgbTooltipModule,
NgbNavModule,
NgApexchartsModule,
SimplebarAngularModule,
ToastrModule.forRoot({
  timeOut: 1000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    progressBar:true,
    progressAnimation:"increasing"

}),

  ],
  declarations: [AdminComponent,PrintquotationadminComponent,CompanydetailComponent,UserdetailComponent,TicketreplyComponent,AllticketsComponent,TicketdetailComponent,RFQComponent,StockComponent,OfferComponent,QuotedComponent,AllcompaniesComponent,DashboardComponent,ContactlistComponent,CreateemailComponent,CreatemessageComponent,EmailsComponent,MessagesComponent,QuotationsComponent,UsersComponent],
  providers:[ToastrService]
})
export class AdminModule { }

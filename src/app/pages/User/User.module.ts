
import { CreateticketComponent } from './tickets/Createticket/Createticket.component';
import { OfferComponent } from './tickets/Offer/Offer.component';
import { RFQComponent } from './tickets/RFQ/RFQ.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
import { MyquotationsComponent } from './myquotations/myquotations.component';
import { UserRoutingModule } from './userrouting.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockComponent } from './tickets/Stock/Stock.component';
import { QuotedComponent } from './tickets/Quoted/Quoted.component';
import { TicketreplyComponent } from './ticketreply/ticketreply.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import * as mat from '@angular/material';
import { Ticket } from 'src/app/core/models/ticket';
import { PrintQuotationComponent } from './printQuotation/printQuotation.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule,

    NgxPaginationModule,
    mat.MatSnackBarModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
  
    NgxPrintModule,
    
Ng2OrderModule,
Ng2SearchPipeModule,
NgxDropzoneModule,

ReactiveFormsModule,
NotifierModule,
NgbTooltipModule,
NgbNavModule,
NgApexchartsModule,
SimplebarAngularModule,
ToastrModule.forRoot({
  timeOut: 10000,
  positionClass: 'toast-bottom-left',
  preventDuplicates: true,
}),

  ],
  declarations: [UserComponent,PrintQuotationComponent,CreateticketComponent,MyquotationsComponent,DashboardComponent,RFQComponent,OfferComponent,StockComponent,QuotedComponent,TicketreplyComponent],
  providers:[Ticket,ToastrService]
})
export class UserModule { }

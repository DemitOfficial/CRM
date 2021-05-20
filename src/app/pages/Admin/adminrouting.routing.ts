import { TicketdetailComponent } from './tickets/ticketdetail/ticketdetail.component';
import { TicketreplyComponent } from './tickets/ticketreply/ticketreply.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

import { AllcompaniesComponent } from './allcompanies/allcompanies.component';
import { EmailsComponent } from './emails/emails.component';
import { CreateemailComponent } from './createemail/createemail.component';
import { CreatemessageComponent } from './createmessage/createmessage.component';
import { MessagesComponent } from './messages/messages.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RFQComponent } from './tickets/RFQ/RFQ.component';
import { StockComponent } from './tickets/stock/stock.component';
import { OfferComponent } from './tickets/Offer/Offer.component';
import { QuotedComponent } from './tickets/Quoted/Quoted.component';
import { AllticketsComponent } from './tickets/Alltickets/Alltickets.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { PrintQuotationComponent } from '../User/printQuotation/printQuotation.component';
import { PrintquotationadminComponent } from './printquotationadmin/printquotationadmin.component';


const routes: Routes = [
  {
      path: '',
      component:DashboardComponent
  },
  {
    path: 'tickets',
    component:AllticketsComponent
},
{
  path: 'print',
  component:PrintquotationadminComponent
},

{
  path: 'companies',
  component:AllcompaniesComponent
},
{
  path: 'ticketreply',
  component:TicketreplyComponent
},
{
  path: 'ticketdetail',
  component:TicketdetailComponent
},
{
  path: 'userdetail',
  component:UserdetailComponent
},
{
  path: 'companydetail',
  component:CompanydetailComponent
},
{
  path: 'mycontacts',
  component:ContactlistComponent
},
{
  path: 'users',
  component:UsersComponent
},
{
  path: 'quotations',
  component:QuotationsComponent
},
{
  path: 'messages',
  component:MessagesComponent
},
{
  path: 'createmessage',
  component:CreatemessageComponent
},
{
  path: 'createemail',
  component:CreateemailComponent
},
{
  path: 'emails',
  component:EmailsComponent
},
{
  path: 'quoted',
  component:QuotedComponent
},
{
  path: 'offer',
  component:OfferComponent
,
},
{
  path: 'stock',
  component:StockComponent
},
{
  path: 'rfq',
  component:RFQComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

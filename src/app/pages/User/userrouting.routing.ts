

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyquotationsComponent } from './myquotations/myquotations.component';
import { PrintQuotationComponent } from './printQuotation/printQuotation.component';
import { TicketreplyComponent } from './ticketreply/ticketreply.component';
import { OfferComponent } from './tickets/Offer/Offer.component';
import { QuotedComponent } from './tickets/Quoted/Quoted.component';
import { RFQComponent } from './tickets/RFQ/RFQ.component';
import { StockComponent } from './tickets/Stock/Stock.component';

const routes: Routes = [
  {
      path: '',
      component:DashboardComponent
  },

{
  path: 'rfq',
  component:RFQComponent
},
{
  path: 'offer',
  component:OfferComponent
},
{
  path: 'ticketreply',
  component:TicketreplyComponent
},
{
  path: 'stock',
  component:StockComponent
},
{
  path: 'quoted',
  component:QuotedComponent
},
  {
    path: 'quotations',
    component:MyquotationsComponent
},
{
  path: 'print',
  component:PrintQuotationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

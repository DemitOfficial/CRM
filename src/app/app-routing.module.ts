
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CompanydetailComponent } from './thirdpartypages/companydetail/companydetail.component';
import { ContactdetailComponent } from './thirdpartypages/contactdetail/contactdetail.component';

import { TicketdetailComponent } from './thirdpartypages/ticketdetail/ticketdetail.component';
const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  {path:'ticketinfo/:mystring',component:TicketdetailComponent},

  {path:'contactinfo/:mystring',component:ContactdetailComponent},
  {path:'companyinfo/:mystring',component:CompanydetailComponent},
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

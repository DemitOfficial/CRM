import { Component, OnInit } from '@angular/core';
import { transactions, lineColumAreaChart, revenueColumnChart, customerRadialBarChart, orderRadialBarChart, growthColumnChart} from './data';

import { ChartType } from './dashboard.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  lineColumAreaChart: ChartType;
  revenueColumnChart: ChartType;
  orderRadialBarChart: ChartType;
  customerRadialBarChart: ChartType;
  growthColumnChart: ChartType;
  transactions;
  breadCrumbItems: Array<{}>;
  DashboardData:any;
  private readonly notifier: NotifierService;
 
  
  addExtraClass: boolean = false;
  constructor(private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,private Dashboardservice:DashboardService) {

   }

  ngOnInit() {
    this.Dashboard();
    /**    this.Dashboard();
     * Fetches the data
     */
    this.fetchData();
    this.breadCrumbItems = [{ label: 'CRM' }, { label: 'Dashboard', active: true }];
  }
  
  Dashboard()
  { 
 
   

     this.spinner.show()
    this.Dashboardservice.GetUserDashboardData().subscribe((next:any)=>{
      debugger;
      this.DashboardData=next.res;
      this.spinner.hide()
      console.log(this.DashboardData)
     
          },error=>{
            this.spinner.hide()
          })
  
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    
    this.lineColumAreaChart = lineColumAreaChart;
    this.revenueColumnChart = revenueColumnChart;
    this.orderRadialBarChart = orderRadialBarChart;
    this.customerRadialBarChart = customerRadialBarChart;
    this.growthColumnChart = growthColumnChart;
    
    this.transactions = transactions;
  }


}

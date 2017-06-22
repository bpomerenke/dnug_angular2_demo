import { Component, OnInit } from '@angular/core';
import { PtoUsageService } from '../services/pto-usage.service'
import { AppConstants } from '../app-constants'; 

@Component({
  moduleId: module.id,
  selector: 'pto-usage-chart',
  templateUrl: 'pto-usage-chart.component.html'
})

export class PtoUsageChartComponent implements OnInit {
  constructor(private ptoUsageService: PtoUsageService){

  }

  ngOnInit() : void {
    this.months = AppConstants.monthLabels;
    this.projectOutData();
  }

  lineChartData:Array<any> = [
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0)
    ];

  months:Array<string> = [];

  lineChartOptions:any = {
    responsive: true
  };
  lineChartColors:Array<any> = [ AppConstants.chartGreyOpaque, AppConstants.chartGrey, AppConstants.chartLightGrey, AppConstants.chartRed ];

  private initializeChartData(label: string, value: number, count: number) : any {
    let dataAry = Array.apply(null, Array(count)).map(()=>{return value;});
    return { data: dataAry, label: label };
  }

  projectOutData():void {
    let accrualRate = 14.66;
    let starting = 80;
    let maxChartValue = 250;
    
    this.ptoUsageService.getPtoUsage().then((usage) => {    
      console.log('projecting data', usage);
      let accrual = this.initializeChartData('Accrual', 0, 13);
      let actual = this.initializeChartData('Actual', 0, 13);
      let maxCarryOver = this.initializeChartData('Max Carryover', 40, 13);
      let upToNow = this.initializeChartData('Today', maxChartValue, 1);
      let totalUsedSoFar = 0;

      accrual.data[0] = starting;
      actual.data[0] = starting;
      for (let j = 1; j < AppConstants.monthLabels.length; j++) {
        let usageItems = usage.filter(item=>new Date(item.startDate).getMonth() === (j-1));
        let hoursForThisMonth = usageItems.reduce((a, b) => a + b.hoursUsed, 0);
        totalUsedSoFar+=hoursForThisMonth;

        if(j < 12){
          accrual.data[j] = (accrualRate * j) + starting;
        } else {
          accrual.data[j] = accrual.data[j-1];
        }
        actual.data[j] = accrual.data[j] - totalUsedSoFar;

        if(new Date().getMonth() > (j-1)) upToNow.data.push(maxChartValue);
      }
      this.lineChartData = [upToNow, actual, accrual, maxCarryOver];
    });
  }
}
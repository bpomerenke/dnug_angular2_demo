import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PtoUsage } from '../pto/pto-usage';
import { PtoUsageModal } from '../pto/pto-usage-modal';
import { PtoUsageService } from '../services/pto-usage.service';
import { AppConstants } from '../app-constants'; 
import { ModalUtilities } from '../modal-utilities';

@Component({
  moduleId: module.id,
  selector: 'pto-usage-chart',
  templateUrl: 'pto-usage-chart.component.html'
})

export class PtoUsageChartComponent implements OnInit {
  constructor(private ptoUsageService: PtoUsageService, private modal: NgbModal){

  }

  ngOnInit() : void {
    this.months = AppConstants.monthLabels;
    this.projectOutData();
    this.ptoUsageService.dataUpdated.asObservable().subscribe(()=>{
      console.log('refreshing chart');
      this.projectOutData();
    });
  }

  lineChartData:Array<any> = [
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0),
      this.initializeChartData('init', 0,0)
    ];

  months:Array<string> = [];

  lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          time: { units: 'month'}
        }
      ]
    }
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

  
  refreshChart(): Function {
    return () => { this.projectOutData(); }
  }
    
  chartX = 0;
  chartY = 0; 
  chartDate = new Date();
  chartWidth = 0;
  // events
  chartClicked(e:any):void {
    console.log(e.event);
    let x = e.event.offsetX;
    let y = e.event.offsetY;
    
    let width = e.event.target.clientWidth;

    let percent = (x - 30) / (width - 45);
    let date = new Date(new Date().getFullYear(), 0)
    date.setDate(percent * 365);

    console.log(percent, date); 

    this.chartX = x;
    this.chartY = y;
    this.chartDate = date;    
    this.chartWidth = width;

    const modalRef = this.modal.open(PtoUsageModal);
    modalRef.componentInstance.modalTitle = "Add Item";
    modalRef.componentInstance.item = { startDate: date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear() };
    modalRef.result.then((result) => {
      this.ptoUsageService.addPto(result);
    }, (reason) => {
      console.log(`Dismissed ${ModalUtilities.getDismissReason(reason)}`);
    });
  }


}
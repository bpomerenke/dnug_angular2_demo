import { Component, OnInit } from '@angular/core';

import { PtoUsage } from '../pto/pto-usage';
import { PtoUsageService } from '../services/pto-usage.service';
import { AppConstants } from '../app-constants'; 

@Component({
  moduleId: module.id,
  selector: 'pto-usage-list',
  templateUrl: 'pto-usage-list.component.html'
})

export class PtoUsageListComponent implements OnInit {
  currentPtoUsage: PtoUsage [] = [];
  ptoViewType = 'Events';  
  
  constructor(private ptoUsageService:PtoUsageService){}

  ngOnInit() : void {
    this.ptoUsageService.getPtoUsage().then((usage) => {
      this.currentPtoUsage = usage;
    });
  }
  
  togglePtoView(viewType: string){
    this.ptoViewType = viewType;
  }

  isViewType(viewType: string) : boolean{
    return this.ptoViewType === viewType;
  }
  
  itemInPast(item: PtoUsage){
    return new Date().getTime() > new Date(item.startDate).getTime();
  }

  getExpectedUsage() : PtoUsage[] {
    if(this.ptoViewType === 'Months'){
      var result = new Array<PtoUsage>(12);
      for(let i=0; i<12; i++){
        let itemsForThisMonth = this.currentPtoUsage.filter(item=>new Date(item.startDate).getMonth() === i);
        let hoursForThisMonth = itemsForThisMonth.reduce((a, b) => a + b.hoursUsed, 0);

        result[i] = {id: -1, startDate: (i+1) + '-1-2017', endDate: (i+1) + '-1-2017', hoursUsed: hoursForThisMonth, title: AppConstants.monthLabels[i]};
      }
      return result;
    } 

    return this.currentPtoUsage.sort(this.compareUsageDates);
  }  

  private compareUsageDates(itemA: PtoUsage, itemB: PtoUsage): number{
    return new Date(itemA.startDate).getTime() - new Date(itemB.startDate).getTime()
  }
}
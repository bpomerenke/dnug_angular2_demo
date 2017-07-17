import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { PtoUsage } from '../pto/pto-usage';

@Injectable()
export class PtoUsageService {
    private currentPtoUsage = [
      {id: 1, startDate: '1-13-17', endDate: '1-13-17', hoursUsed: 4, title: '???'},
      {id: 2, startDate: '1-27-17', endDate: '1-27-17', hoursUsed: 2, title: '???'},
      {id: 3, startDate: '2-10-17', endDate: '2-10-17', hoursUsed: 1, title: '???'},
      {id: 4, startDate: '2-15-17', endDate: '2-15-17', hoursUsed: 1, title: '???'},
      {id: 5, startDate: '3-13-17', endDate: '3-13-17', hoursUsed: 1, title: '???'},
      {id: 6, startDate: '3-20-17', endDate: '3-28-17', hoursUsed: 39, title: 'ski trip'},
      {id: 7, startDate: '3-31-17', endDate: '4-07-17', hoursUsed: 2, title: '???'}, 
      {id: 8, startDate: '4-28-17', endDate: '4-28-17', hoursUsed: 3, title: 'holly wedding'}, 
      {id: 5, startDate: '5-12-17', endDate: '5-31-17', hoursUsed: 12, title: '???'},
      {id: 9, startDate: '6-1-17', endDate: '6-5-17', hoursUsed: 20, title: 'john wedding / DC'},
      {id: 9, startDate: '6-23-17', endDate: '6-23-17', hoursUsed: 8, title: 'durham bach party'},
      {id: 9, startDate: '7-7-17', endDate: '7-7-17', hoursUsed: 8, title: 'durham wedding'},
      {id: 10, startDate: '7-17-17', endDate: '7-21-17', hoursUsed: 40, title: 'lake trip'},
      {id: 11, startDate: '8-18-17', endDate: '8-18-17', hoursUsed: 8, title: 'nate wedding'}, 
      {id: 12, startDate: '12-25-17', endDate: '12-31-17', hoursUsed: 24, title: 'holidays'}
    ];

    dataUpdated: Subject<boolean> = new Subject<boolean>();
    
    constructor(private http: Http){

    }

    getPtoUsage() : Promise<PtoUsage[]> {
        return this.http.get('http://localhost:5000/api/ptousage')
            .toPromise()
            .then(response => {
                return response.json() as PtoUsage[]
            });
    }

    updatePto(item: PtoUsage) : Promise<PtoUsage> {
        return this.http.put(`http://localhost:5000/api/ptousage/${item.id}`, item)
            .toPromise()
            .then(()=>{
                this.dataUpdated.next(true);
                return item;
            });
    }

    addPto(item:PtoUsage) : Promise<PtoUsage> {
        this.currentPtoUsage.push(item);

        this.dataUpdated.next(true);
        return Promise.resolve(item);
    }
}

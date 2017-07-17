import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { PtoUsage } from '../pto/pto-usage';

@Injectable()
export class PtoUsageService {
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
        return this.http.post('http://localhost:5000/api/ptousage', item)
            .toPromise()
            .then((response: any)=>{
                this.dataUpdated.next(true);
                return response.json() as PtoUsage;
            });
    }
}

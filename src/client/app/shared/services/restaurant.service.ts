import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Restaurant, RestaurantFormComponent, TimeFormatConversion, DataFormatConversion } from '../index';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class RestaurantService {
    constructor(public http: Http, public tFC: TimeFormatConversion){}

    restaurant: any = null;

    addRestaurant (restaurant: Restaurant): Observable<Restaurant> {
        const body = JSON.stringify({restaurant});
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({ headers: headers});
        console.log(body);

        return this.http.post('<%= API_DEST%>'+'restaurant'+token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler);

    }

    getRestaurant (): Observable<Restaurant> {

        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        return this.http.get('<%= API_DEST%>'+'restaurant'+token)
            .map(this.extractData)
            .catch(this.errorHandler);
    }

    addMenu (value: any): Observable<any> {
        const body = JSON.stringify({value});
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({headers: headers});

        return this.http.post('<%= API_DEST%>'+'restaurant/menu'+token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler)
    }

    convertData(value: any) {
        let init: Restaurant = new Restaurant(null, null,null,null,null,null,null,null,null,null);
        let start: any[] = [];
        let end: any[] = [];
        let time: any;
        for(let i=0; i<7; i++) {
            start[i] = value.opening[i].starttime;
            end[i] = value.opening[i].endtime;
        }
        time = this.tFC.timeFormatConvert(start, end);
        let j = value.location.address.split(', ');
        init.name = value.name;
        init.address1 = j[0];
        init.address2 = j[1];
        init.city = value.location.city;
        init.postcode = value.location.postcode;
        init.email = value.contact.email;
        init.phone = value.contact.phone;
        return [init, time];

    }


   private extractData(res: Response) {
       let body = res.json();
       return body.obj || { };
   }

   private errorHandler(error:any) {
       let errMsg = error
       return Observable.throw(errMsg);
   }
}
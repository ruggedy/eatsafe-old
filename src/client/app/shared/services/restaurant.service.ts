import { Restaurant } from '../index'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class RestaurantService {
    constructor(public http: Http){}

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


   private extractData(res: Response) {
       let body = res.json();
       return body.obj || { };
   }

   private errorHandler(error:any) {
       let errMsg = error
       return Observable.throw(errMsg);
   }
}
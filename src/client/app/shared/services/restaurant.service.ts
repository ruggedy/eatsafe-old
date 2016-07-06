import { Restaurant } from '../index'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class RestaurantService {
    constructor(public http: Http){}

    addRestaurant (restaurant: Restaurant): Observable<Restaurant> {
        let body = JSON.stringify({restaurant});
        let headers = new Headers({ 'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers});
        console.log(body);

        return this.http.post('http://localhost:3000/restaurant', body, options)
            .map(this.extractData)
            .catch(this.errorHandler);

    }


   private extractData(res: Response) {
       let body = res.json();
       return body.obj || { };
   }

   private errorHandler(error:any) {
       let errMsg = error.message
       return Observable.throw(errMsg);
   }
}
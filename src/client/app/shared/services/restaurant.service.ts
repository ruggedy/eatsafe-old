import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Restaurant, RestaurantFormComponent, TimeFormatConversion, DataFormatConversion } from '../index';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable() 
export class RestaurantService {
    constructor(public http: Http, public tFC: TimeFormatConversion){}


    private restaurant: any = new BehaviorSubject<any>(null);
    private currentPage: any = new BehaviorSubject<any>('Home');
    observableCurrentPage$ = this.currentPage.asObservable();
    observableRestaurant$ = this.restaurant.asObservable();
    menu: any[] = null;
    menuEdit: any = null;

    addRestaurant (restaurant: Restaurant): Observable<Restaurant> {
        const body = JSON.stringify({restaurant});
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({ headers: headers});

        return this.http.post('<%= API_DEST%>'+'restaurant'+token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler);

    }

    updateRestaurant (restaurant: Restaurant, restaurantId: any): Observable<Restaurant> {
        const body = JSON.stringify({restaurant});
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({ headers: headers});

        return this.http.patch('<%= API_DEST%>'+'restaurant/'+ restaurantId+token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler);

    }

    getRestaurant (): Observable<any> {

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

    updateMenu (value: any, menuId: any) : Observable<any> {
        const body = JSON.stringify({value});
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({headers: headers});

        return this.http.patch('<%= API_DEST%>'+'restaurant/menu/' + menuId + token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler)
    }

    deleteSingleMenu (value: any, menuId: any) : Observable<any> {
        this.menu.splice(this.menu.indexOf(value), 1);
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '';
        return this.http.delete('<%= API_DEST%>'+'restaurant/menu/' + menuId + token)
            .map(this.extractData)
            .catch(this.errorHandler)      
    }

    deleteMultipleMenu (value: any, menuIds: any) : Observable<any> {
        for (let i = 0; i< value.length; i++) {
            this.menu.splice(this.menu.indexOf(value[i]), 1)
        }
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '';
        const body = JSON.stringify({"data" : menuIds});
        console.log(body);
        return this.http.delete('<%= API_DEST%>'+'restaurant/menu/deleteMulti/' + body + token)
            .map(this.extractData)
            .catch(this.errorHandler)      
    }

    currentPageChanged(value: string) {
        this.currentPage.next(value);
    }

    restaurantChanged(value: any) {
        this.restaurant.next(value);
    }

    menuChanged(value: any) {
        let resValue = this.restaurant.value;
        let index = resValue.menu.indexOf(this.menuEdit);
        if(index !== -1) {
            resValue.menu[index] = value;
            this.restaurant.next(resValue); 
        } else {
            resValue.menu.push(value);
        }

        sessionStorage.removeItem('menuEdit');
    }
    

    convertData(value: any) {
        let init: Restaurant = new Restaurant(null, null,null,null,null,null,null,null,null,null);
        let start: any[] = [];
        let end: any[] = [];
        let closed: any[] = [];
        let time: any;
        for(let i=0; i<7; i++) {
            start[i] = value.opening[i].starttime;
            end[i] = value.opening[i].endtime;
            closed[i] = value.opening[i].closed;
        }
        time = this.tFC.timeFormatConvert(start, end, closed);
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
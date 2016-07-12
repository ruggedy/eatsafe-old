import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Registration } from '../index';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/Rx';

@Injectable() 
export class AuthService {
    constructor(private _http: Http){}
    
    signup(user: Registration) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('<%=API_DEST%>'+'user', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    
    signin(user: Registration) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('<%=API_DEST%>'+'user/signin', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    lookup(control: string, source: string ) {
        const body = JSON.stringify({[source] : control});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('<%=API_DEST%>'+'user/compare', body, {headers: headers})
            .map(response => response.json());
    }  
    
    logout() {
        localStorage.clear();
    }
    
    isLoggedIn() {
        if(!tokenNotExpired('token')) {
            localStorage.removeItem('token');
        }
        return tokenNotExpired('token');
    }
    hasRestaurant() {
        if(localStorage.getItem('restaurant')) {
            return true;
        }
        return false;
    }
}
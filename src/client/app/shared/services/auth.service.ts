import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Registration, RestaurantService } from '../index';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/Rx';

@Injectable() 
export class AuthService {
    constructor(private _http: Http ){}

    userName: string = null;
    users: any[] = null;
    jwtHelper: JwtHelper = new JwtHelper();

    getUsers() {
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        return this._http.get('<%= API_DEST%>'+'user/admin'+token)
            .map(this.extractData)
            .catch(this.errorHandler);
    }

    deleteMultipleUsers(value: any, userIds: any, menuIds: any) : Observable<any> {
        for (let i = 0; i< value.length; i++) {
            this.users.splice(this.users.indexOf(value[i]), 1)
        }
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '';
        const body = JSON.stringify({"userData" : userIds, "menuData": menuIds });
        console.log(body);
        return this._http.delete('<%= API_DEST%>'+'user/admin/' + body + token)
            .map(this.extractData)
            .catch(this.errorHandler)      
    }

    validateMultipleUsers(value: any, userIds: any) : Observable<any> {
        for (let i = 0; i< value.length; i++) {
            this.users.splice(this.users.indexOf(value[i]), 1)
        }
        const body = JSON.stringify({value});
        const ids = JSON.stringify({"data" : userIds})
        const headers = new Headers({ 'Content-Type':'application/json'});
        const token = localStorage.getItem('token') ? '?token='+ localStorage.getItem('token') : '?token=invalid';
        let options = new RequestOptions({headers: headers});
        return this._http.patch('<%= API_DEST%>'+'user/admin/' + ids + token, body, options)
            .map(this.extractData)
            .catch(this.errorHandler)      
    }
    
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

    isAdmin() {
        let userInfo = localStorage.getItem('token')? this.jwtHelper.decodeToken(localStorage.getItem('token')) : null;

        if(userInfo) {
            if(userInfo.user.admin) {
                return true
            }
        }
        return false;
    }

    isValidated() {
        let userInfo = localStorage.getItem('token')? this.jwtHelper.decodeToken(localStorage.getItem('token')) : null;

        if(userInfo) {
            if(userInfo.user.validated) {
                return true
            }
        }
        return false;
    }

    private extractData(res: Response) {
       let body = res.json();
       return body.obj || body.message || { };
   }

   private errorHandler(error:any) {
       let errMsg = error
       return Observable.throw(errMsg);
   }
}
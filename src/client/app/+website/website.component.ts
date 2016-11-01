import { Component, OnInit, OnDestroy} from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent, ToolbarComponent, AuthService} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-website',
    templateUrl: 'website.component.html',
    styleUrls: ['website.component.css'],
    directives: [NavbarComponent, ToolbarComponent, ROUTER_DIRECTIVES]
})
export class WebsiteComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean = false;
    isAdmin: boolean = false;
    isValidated: boolean = false;
    subscription1: any = null;
    subscription2: any = null;
    subscription3: any = null;
    constructor(private _as: AuthService) { }

    logout(event:any) {
        if(event.value === 'logout') {
            this._as.logout();
            this.isLoggedIn = false;
            this._as.userStatusCheck(this._as.isLoggedIn(), this._as.isValidated(), this._as.isAdmin())
            return true;
        }
        return false;
    }

    userStatusCheck() {
        this.isLoggedIn = this._as.isLoggedIn();
        this.isAdmin = this._as.isAdmin();
        this.isValidated = this._as.isValidated();
        this._as.userStatusCheck(this._as.isLoggedIn(), this._as.isValidated(), this._as.isAdmin())
    }

    ngOnDestroy() {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
    }

    ngOnInit() { 
        this.userStatusCheck()
        this.subscription1 = this._as.observableloggedIn$.subscribe(
            (item: any) => {
                if(item) {
                    this.isLoggedIn = item;
                }
            }
        )
         
        this.subscription2 = this._as.observableobservableValidated$.subscribe(
            (item: any) => {
                if(item) {
                    this.isValidated = item;
                }
            }
        ) 
         
        this.subscription3 = this._as.observableobservableAdmin$.subscribe(
            (item: any) => {
                if(item) {
                    this.isAdmin = item;
                }
            }
        ) 
    }

}
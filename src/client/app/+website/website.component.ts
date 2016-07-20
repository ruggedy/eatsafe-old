import { Component, OnInit} from '@angular/core';
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
export class WebsiteComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(private _as: AuthService) { }

    logout(event:any) {
        if(event.value === 'logout') {
            this._as.logout();
            this.isLoggedIn = false;
            return true;
        }
        return false;
    }

    ngOnInit() { 
        this.isLoggedIn = this._as.isLoggedIn();
    }

}
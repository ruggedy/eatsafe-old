import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-redirect',
    templateUrl: 'redirect.component.html',
    styleUrls: ['redirect.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class RedirectComponent implements OnInit {
    constructor(private _router: Router) { }

    redirect() {
        setTimeout(()=> this._router.navigate(['home']), 3000);
    }

    ngOnInit() {
        this.redirect(); 
    }

}
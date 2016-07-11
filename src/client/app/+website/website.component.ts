import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent, ToolbarComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-website',
    templateUrl: 'website.component.html',
    styleUrls: ['website.component.css'],
    directives: [NavbarComponent, ToolbarComponent, ROUTER_DIRECTIVES]
})
export class WebsiteComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
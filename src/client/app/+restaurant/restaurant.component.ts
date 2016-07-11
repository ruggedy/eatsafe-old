import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantService, TimeFormatConversion,DataFormatConversion, RestaurantFormComponent, RestaurantHeaderComponent, RestaurantSidebarComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    styleUrls: ['restaurant.component.css'],
    providers: [TimeFormatConversion, DataFormatConversion],
    directives: [RestaurantFormComponent, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, RestaurantHeaderComponent, RestaurantSidebarComponent]
})
export class RestaurantComponent implements OnInit {
    constructor() { }
    
    ngOnInit() { 
    }

}
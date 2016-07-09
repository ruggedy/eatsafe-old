import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantService, TimeFormatConversion,DataFormatConversion, RestaurantFormComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    providers: [TimeFormatConversion, DataFormatConversion],
    directives: [RestaurantFormComponent, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class RestaurantComponent implements OnInit {
    constructor() { }
    
    ngOnInit() { 
    }

}
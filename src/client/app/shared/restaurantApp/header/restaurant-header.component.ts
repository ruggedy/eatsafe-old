import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-header',
    templateUrl: 'restaurant-header.component.html',
    styleUrls: ['restaurant-header.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class RestaurantHeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RestaurantSideBar } from './restaurant-sidebar';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-sidebar',
    templateUrl: 'restaurant-sidebar.component.html',
    styleUrls: ['restaurant-sidebar.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class RestaurantSidebarComponent implements OnInit {
    constructor() { }
    
    sideBarOptions: RestaurantSideBar[] =[];
    ngOnInit() {
        let home = new RestaurantSideBar('/something', 'fa-home');
        let statistics = new RestaurantSideBar('/something', 'fa-bar-chart');
        let  menu = new RestaurantSideBar('/something', 'fa-cutlery');
        let  settings = new RestaurantSideBar('/something', 'fa-cog');
        let  print = new RestaurantSideBar('/something', 'fa-print');

        this.sideBarOptions.push(home, menu, statistics, settings, print);
     }

}
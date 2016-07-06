import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion, Menu, MenuFormComponent } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    viewProviders: [TimeFormatConversion, DataFormatConversion],
    styleUrls: ['restaurant.component.css'],
    directives: [RestaurantFormComponent, MenuFormComponent] 
})
export class RestaurantComponent implements OnInit {
    constructor(public rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    init: Restaurant = new Restaurant(null, null, null, null, null, null, null, null, null, null);
    restaurant: any;
    time: any;

    initMenu: Menu = new Menu('Super Special', 'Something super special and stuff', 'Starter');

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value)
        this.rs.addRestaurant(this.restaurant)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            )
    }
    ngOnInit() { 
        
        this.time = this.tFC.timeFormatConvert(this.init? this.init.start : null, this.init? this.init.end : null);
        console.log(this.time);
    }

}
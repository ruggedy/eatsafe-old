import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    viewProviders: [TimeFormatConversion, DataFormatConversion],
    styleUrls: ['restaurant.component.css'],
    directives: [RestaurantFormComponent] 
})
export class RestaurantComponent implements OnInit {
    constructor(public rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    init: Restaurant = new Restaurant(null, null, null, null, null, null, null, null, null, null);
    restaurant: any;
    time: any;

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
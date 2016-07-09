import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-profile-create',
    templateUrl: 'profile-create.component.html',
    styleUrls: ['profile-create.component.css'],
    providers: [TimeFormatConversion, DataFormatConversion],
    directives: [RestaurantFormComponent, REACTIVE_FORM_DIRECTIVES] 
})
export class ProfileCreateComponent implements OnInit {
    constructor(public rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    init: Restaurant = new Restaurant(null, null, null, null, null, null, null, null, null, null);
    restaurant: any;
    time: any;

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value)
        this.rs.addRestaurant(this.restaurant)
            .subscribe(
                response => {
                    this.rs.restaurant = response;
                    console.log(response);
                },
                error => console.log(error)
            )
    }
    ngOnInit() { 
        console.log('it inits')
        this.time = this.tFC.timeFormatConvert(this.init? this.init.start : null, this.init? this.init.end : null);
    }

}
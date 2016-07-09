import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.css'],
    directives: [RestaurantFormComponent] 
})
export class ProfileEditComponent implements OnInit {
    constructor(public rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    init: Restaurant = new Restaurant(null, null, null, null, null, null, null, null, null, null);
    restaurant: any= null;
    time: any;
    start: any[] = [];
    end: any[] = [];

    

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value)
        this.rs.addRestaurant(this.restaurant)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            )
    }

    convertData(value: any) {
        console.log(value);
        for(let i=0; i<7; i++) {
            this.start[i] = value.opening[i].starttime;
            this.end[i] = value.opening[i].endtime;
        }
        this.time = this.tFC.timeFormatConvert(this.start, this.end);
        console.log(this.rs.restaurant);
        let j = value.location.address.split(', ');
        this.init.name = value.name;
        this.init.address1 = j[0];
        this.init.address2 = j[1];
        this.init.city = value.location.city;
        this.init.postcode = value.location.postcode;
        this.init.email = value.contact.email;
        this.init.phone = value.contact.phone;

    }

    ngOnInit() { 
        

        if (this.rs.restaurant) {
            this.restaurant = this.rs.restaurant;
            this.convertData(this.restaurant);
        } else {
            this.rs.getRestaurant()
                .subscribe(
                    response => {
                        console.log(response);
                        this.rs.restaurant = response;
                        this.restaurant = response;
                        this.convertData(response);
                    },
                    error => console.log(error)
                )
        }
    }

}
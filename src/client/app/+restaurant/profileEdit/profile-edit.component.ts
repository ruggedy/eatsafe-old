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
    
    restaurant: any;
    nav: string[] = ['restaurant', 'home'];

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value)
        this.rs.addRestaurant(this.restaurant)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            )
    }


    ngOnInit() { 
        

        if (this.rs.restaurant) {
            this.restaurant = this.rs.restaurant;
        } else {
            this.rs.getRestaurant()
                .subscribe(
                    response => {
                        console.log(response);
                        let value = this.rs.convertData(response); 
                        this.rs.restaurant = value;
                        this.restaurant = value;
                    },
                    error => console.log(error)
                )
        }
    }

}
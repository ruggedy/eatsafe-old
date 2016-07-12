import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantService } from '../../shared/index';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
@Component({
    moduleId: module.id,
    selector: 'sd-profile-show',
    templateUrl: 'profile-show.component.html',
    styleUrls: ['profile-show.component.css'],
    directives: [MD_CARD_DIRECTIVES]
})
export class ProfileShowComponent implements OnInit {
    constructor(public rs: RestaurantService) { }

    restaurant: any;
    restaurantPackage: any;
    workingHours: any;

    ngOnInit() {
        if(!this.rs.restaurant) {
            this.rs.getRestaurant()
                .subscribe(
                    data => {
                        this.restaurantPackage = this.rs.convertData(data);
                        this.rs.restaurant = data;
                        this.restaurant = this.restaurantPackage[0];
                        this.workingHours = this.restaurantPackage[1];
                        console.log(this.rs.restaurant);
                    },
                    error => console.log(error)
                )
        } else {
            this.restaurantPackage = this.rs.convertData(this.rs.restaurant);
            this.restaurant = this.restaurantPackage[0];
            this.workingHours = this.restaurantPackage[1];
        }
     }

}
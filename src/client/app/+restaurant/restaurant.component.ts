import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantService, TimeFormatConversion,DataFormatConversion, RestaurantFormComponent, RestaurantHeaderComponent, RestaurantSidebarComponent, AuthService} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    styleUrls: ['restaurant.component.css'],
    providers: [TimeFormatConversion, DataFormatConversion],
    directives: [RestaurantFormComponent, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, RestaurantHeaderComponent, RestaurantSidebarComponent]
})
export class RestaurantComponent implements OnInit, OnDestroy {
    constructor(private _rs: RestaurantService, private _as: AuthService) { }
    
    hasRestaurant: boolean = null;
    name: any = null;
    subscription: any = null;
    getDetails() {
         this._rs.getRestaurant()
            .subscribe(
                data => {
                    this.name = data.name;
                    this._rs.restaurantChanged(data)
                }
            )
     }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.subscription = this._rs.observableRestaurant$.subscribe(
            (item:any) => {
                if(!item) {
                    this.getDetails();
                } else {
                    this.name = item.name;
                }
            }
        )

        this.hasRestaurant = this._as.hasRestaurant();  
    }

}
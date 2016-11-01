import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantService, TimeFormatConversion,DataFormatConversion, RestaurantFormComponent, RestaurantHeaderComponent, RestaurantSidebarComponent, AuthService} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant',
    templateUrl: 'restaurant.component.html',
    styleUrls: ['restaurant.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
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
                    this._rs.restaurantChanged(data)
                }
            )
     }

    ngOnDestroy() {
    }

    ngOnInit() {
        

        this.getDetails();

        this.hasRestaurant = this._as.hasRestaurant();  
    }

}
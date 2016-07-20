import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Restaurant, RestaurantService } from '../../shared/index';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-profile-show',
    templateUrl: 'profile-show.component.html',
    styleUrls: ['profile-show.component.css'],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate('1s ease')
            ]),
            transition('* => void', [
            animate('1s ease', style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class ProfileShowComponent implements OnInit, OnDestroy {
    constructor(public _rs: RestaurantService, private _router:Router) { }

    restaurant: any;
    restaurantPackage: any;
    workingHours: any;
    subscription: any = null;

    editProfile() {
        this._router.navigate(['restaurant', 'profile/edit']);
    }

    getDetails() {
         this._rs.getRestaurant()
            .subscribe(
                data => {
                    this.restaurantPackage = this._rs.convertData(data);
                    this.restaurant = this.restaurantPackage[0];
                    this.workingHours = this.restaurantPackage[1];
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
                            this.restaurantPackage = this._rs.convertData(item);
                            this.restaurant = this.restaurantPackage[0];
                            this.workingHours = this.restaurantPackage[1];
                        }
                    }
                )   
    }

}
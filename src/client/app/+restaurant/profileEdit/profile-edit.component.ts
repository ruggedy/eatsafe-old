import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate  } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.css'],
    directives: [RestaurantFormComponent],
	animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate('1s ease')
            ]),
            transition('* => void', [
                style({transform: 'translateX(100%)'}),
                animate('1s ease')
            ])
        ])
    ] 
})
export class ProfileEditComponent implements OnInit, OnDestroy {
    constructor(public _rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    restaurant: any = null;
    nav: string[] = ['restaurant', 'profile'];
    subscription: any = null;

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value);
        var restaurantId = localStorage.getItem('restaurant');
        this._rs.updateRestaurant(this.restaurant, restaurantId)
            .subscribe(
                response => {
                    this._rs.restaurantChanged(response);
                },
                error => error
            )
    }


    getDetails() {
         this._rs.getRestaurant()
            .subscribe(
                data => {
                    this.restaurant = this._rs.convertData(data);
                    this._rs.restaurantChanged(data)
                }
            )
     }

     ngOnDestroy() {
         this.subscription.unsubscribe();
     }

    ngOnInit() {
      this.subscription =  this._rs.observableRestaurant$.subscribe(
            (item:any) => {
                if(!item) {
                    this.getDetails();
                } else {
                    this.restaurant = this._rs.convertData(item);
                }
            }
        )
   
    }

}
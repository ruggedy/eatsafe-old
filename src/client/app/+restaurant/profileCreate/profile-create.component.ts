import { Component, OnInit, trigger, state, style, transition, animate  } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Restaurant, RestaurantFormComponent, RestaurantService, TimeFormatConversion, DataFormatConversion } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-profile-create',
    templateUrl: 'profile-create.component.html',
    styleUrls: ['profile-create.component.css'],
    providers: [TimeFormatConversion, DataFormatConversion],
    directives: [RestaurantFormComponent, REACTIVE_FORM_DIRECTIVES],
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
export class ProfileCreateComponent implements OnInit {
    constructor(public _rs: RestaurantService, public tFC: TimeFormatConversion, public dFC: DataFormatConversion) { }
    
    init: Restaurant = new Restaurant(null, null, null, null, null, null, null, null, null, null);
    restaurant: any;
    time: any;
    nav: string[] = ['home'];

    myRestaurant(event: any) {
        this.restaurant = this.dFC.dataFormatConvert(event.value)
        this._rs.addRestaurant(this.restaurant)
            .subscribe(
                response => {
                    this._rs.restaurantChanged(response);
                    
                },
                error => error
            )

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('restaurant');
    }
    ngOnInit() { 
        this.time = this.tFC.timeFormatConvert(this.init? this.init.start : null, this.init? this.init.end : null, null); 
    }

}
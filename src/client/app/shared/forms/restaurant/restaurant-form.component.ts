import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import { Restaurant, DataFormatConversion, TimeFormatConversion } from './index';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-form',
    templateUrl: 'restaurant-form.component.html',
    styleUrls: ['restaurant-form.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class RestaurantFormComponent implements OnInit {
    
   
    
    formActive: boolean = true;
    @Input() init: Restaurant = new Restaurant(null,null,null,null,null,null,null,null,null,null);
    @Input() timeConvert: any = null;
    @Output() restaurant = new EventEmitter();
    timesHour: string[] = [];
    timesMin: string[] = [];  
    result: Restaurant;
    error: string;
    restaurantForm: FormGroup;
    final: any[] = null;

    onSubmit() {
        
       this.restaurant.emit({
           value: this.restaurantForm.value
       })
    }
    

    ngOnInit() { 
        for (let i=0; i<24; i++) { 
            if( i === 0) {
               this.timesHour.push(0 +''+i); 
            }
            else if ((Math.log10(i)+1) < 2 ) {
                this.timesHour.push(0 +''+i);
            } else {
                this.timesHour.push(String(i));
            }
        }
        for (let i=0; i<60; i++) {
            if( i === 0) {
               this.timesMin.push(0 +''+i); 
            }
            else if ((Math.log10(i)+1) < 2 ) {
                this.timesMin.push(0 +''+i);
            } else {
                this.timesMin.push(String(i));
            }
        }

        /*** Converting the time to the FormGroup Format */

        if (this.timeConvert) {
            this.final = this.timeConvert;
        }
        

        /***** creating the restaurant form ******/
         this.restaurantForm = new FormGroup( {
        name: new FormControl(this.init.name? this.init.name : ''),
        location: new FormGroup({
            address1: new FormControl(this.init.address1? this.init.address1 : ''),
            address2: new FormControl(this.init.address2? this.init.address2 : ''),
            postcode: new FormControl(this.init.postcode? this.init.postcode : ''),
            city: new FormControl(this.init.city? this.init.city : '')
        }),
        opening: new FormGroup({
            monday: new FormGroup({
                openHour: new FormControl(this.final? this.final[0].startHour : ''),
                openMin: new FormControl(this.final? this.final[0].startMin : ''),
                closeHour: new FormControl(this.final? this.final[0].endHour : ''),
                closeMin: new FormControl(this.final? this.final[0].endMin : '')
            }),
            tuesday: new FormGroup({
                openHour: new FormControl(this.final? this.final[1].startHour : ''),
                openMin: new FormControl(this.final? this.final[1].startMin : ''),
                closeHour: new FormControl(this.final? this.final[1].endHour : ''),
                closeMin: new FormControl(this.final? this.final[1].endMin : '')
            }),
            wednesday: new FormGroup({
                openHour: new FormControl(this.final? this.final[2].startHour : ''),
                openMin: new FormControl(this.final? this.final[2].startMin : ''),
                closeHour: new FormControl(this.final? this.final[2].endHour : ''),
                closeMin: new FormControl(this.final? this.final[2].endMin : '')
            }),
            thursday: new FormGroup({
                openHour: new FormControl(this.final? this.final[3].startHour : ''),
                openMin: new FormControl(this.final? this.final[3].startMin : ''),
                closeHour: new FormControl(this.final? this.final[3].endHour : ''),
                closeMin: new FormControl(this.final? this.final[3].endMin : '')
            }),
            friday: new FormGroup({
                openHour: new FormControl(this.final? this.final[4].startHour : ''),
                openMin: new FormControl(this.final? this.final[4].startMin : ''),
                closeHour: new FormControl(this.final? this.final[4].endHour : ''),
                closeMin: new FormControl(this.final? this.final[4].endMin : '')
            }),
            saturday: new FormGroup({
                openHour: new FormControl(this.final? this.final[5].startHour : ''),
                openMin: new FormControl(this.final? this.final[5].startMin : ''),
                closeHour: new FormControl(this.final? this.final[5].endHour : ''),
                closeMin: new FormControl(this.final? this.final[5].endMin : '')
            }),
            sunday: new FormGroup({
                openHour: new FormControl(this.final? this.final[6].startHour : ''),
                openMin: new FormControl(this.final? this.final[6].startMin : ''),
                closeHour: new FormControl(this.final? this.final[6].endHour : ''),
                closeMin: new FormControl(this.final? this.final[6].endMin : '')
            })
        }),
        contact: new FormGroup({
            email: new FormControl(this.init.email? this.init.email: ''),
            phone: new FormControl(this.init.phone? this.init.phone: ''),
        }),
    });
    
}

}
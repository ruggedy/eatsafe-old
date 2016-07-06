import { Injectable } from '@angular/core';
import {Restaurant} from './index';

@Injectable()
export class DataFormatConversion {
    
    constructor(){}

    dataFormatConvert (formValue: any) {
        let value = formValue;
        let days:string[] = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        // changing the opening times to  seconds and pushing it to a start array in order
        let start1 = ((Number(value.opening.monday.openHour) * 3600) + (Number(value.opening.monday.openMin) * 60));
        let start2 = ((Number(value.opening.tuesday.openHour) * 3600) + (Number(value.opening.tuesday.openMin) * 60));
        let start3 = ((Number(value.opening.wednesday.openHour) * 3600) + (Number(value.opening.wednesday.openMin) * 60));
        let start4 = ((Number(value.opening.thursday.openHour) * 3600) + (Number(value.opening.thursday.openMin) * 60));
        let start5 = ((Number(value.opening.friday.openHour) * 3600) + (Number(value.opening.friday.openMin) * 60));
        let start6 = ((Number(value.opening.saturday.openHour) * 3600) + (Number(value.opening.saturday.openMin) * 60));
        let start7 = ((Number(value.opening.sunday.openHour) * 3600) + (Number(value.opening.sunday.openMin) * 60));
        let start:number[] = [];

        // add values to specific position in array to avoid errors
        start[0] = start1;
        start[1] = start2;
        start[2] = start3;
        start[3] = start4;
        start[4] = start5;
        start[5] = start6;
        start[6] = start7;

        // changing the opening times to  seconds and pushing it to a start array in order
        let end1 = ((Number(value.opening.monday.closeHour) * 3600) + (Number(value.opening.monday.closeMin) * 60));
        let end2 = ((Number(value.opening.tuesday.closeHour) * 3600) + (Number(value.opening.tuesday.closeMin) * 60));
        let end3 = ((Number(value.opening.wednesday.closeHour) * 3600) + (Number(value.opening.wednesday.closeMin) * 60));
        let end4 = ((Number(value.opening.thursday.closeHour) * 3600) + (Number(value.opening.thursday.closeMin) * 60));
        let end5 = ((Number(value.opening.friday.closeHour) * 3600) + (Number(value.opening.friday.closeMin) * 60));
        let end6 = ((Number(value.opening.saturday.closeHour) * 3600) + (Number(value.opening.saturday.closeMin) * 60));
        let end7 = ((Number(value.opening.sunday.closeHour) * 3600) + (Number(value.opening.sunday.closeMin) * 60));
        let end:number[] = [];

        // add values to specific position in array to avoid errors
        end[0] = end1;
        end[1] = end2;
        end[2] = end3;
        end[3] = end4;
        end[4] = end5;
        end[5] = end6;
        end[6] = end7;

        


        let name = value.name;
        let address1 = value.location.address1;
        let address2 = value.location.address2;
        let postcode = value.location.postcode;
        let city = value.location.city;
        let email = value.contact.email;
        let phone = value.contact.phone;

        let restaurant:Restaurant;

        return restaurant = new Restaurant(
            name, address1, address2,
            postcode, city, days, start, end,
            email, phone
        );
    }
}
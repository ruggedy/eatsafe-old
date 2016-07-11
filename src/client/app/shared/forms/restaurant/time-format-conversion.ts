import { Injectable } from '@angular/core';
import {Restaurant} from './index';

@Injectable()
export class TimeFormatConversion {

    constructor(){}

    timeFormatConvert(start:number[], end:number[]) {
        /* DO THE MATHS FUNCTION TO CONVERT TIME FORM 
        /* SECONDS TO 24HR FORMAT
        */
        let final: any[] = [];
         if (start && end) {
             let days: any[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
             let color: any[] = ['blue', 'green', 'purple', 'light', 'gray', 'red', 'dark'];

            for (let i=0; i<days.length; i++) {
                let time: any = {}
                let startHour = Math.floor(start[i]/3600);
                let startMin = (start[i]%3600)/60;
                let endHour = Math.floor(end[i]/3600);
                let endMin = (end[i]%3600)/60;

                
                if( startHour === 0) {
                    time['startHour'] = 0 +''+startHour; 
                }
                else if ((Math.log10(startHour)+1) < 2 ) {
                    time['startHour'] = 0 +''+startHour;
                } else {
                    time['startHour'] = String(startHour)
                }
 
                if( startMin === 0) {
                    time['startMin'] = 0 +''+startMin; 
                }
                else if ((Math.log10(startMin)+1) < 2 ) {
                    time['startMin'] = 0 +''+startMin;
                } else {
                    time['startMin'] = String(startMin)
                }
 
                if( endHour === 0) {
                    time['endHour'] = 0 +''+endHour; 
                }
                else if ((Math.log10(endHour)+1) < 2 ) {
                    time['endHour'] = 0 +''+endHour;
                } else {
                    time['endHour'] = String(endHour)
                }
 
                if( endMin === 0) {
                    time['endMin'] = 0 +''+endMin; 
                }
                else if ((Math.log10(endMin)+1) < 2 ) {
                    time['endMin'] = 0 +''+endMin;
                } else {
                    time['endMin'] = String(endMin)
                }
                time['day'] = days[i];
                time['color'] = color[i];
                final[i]= time; 
                
            }
        } else {
            final = null;
        }

        return final;
    }
}
import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/index';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives:[MD_CARD_DIRECTIVES, MD_LIST_DIRECTIVES],
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

export class RestaurantHomeComponent implements OnInit, OnDestroy {
    constructor(private _rs:RestaurantService, private _router:Router) { }

    restaurant: any = null;
    starters: number[] = null;
    allergens: string[] = null;
    final: any;
    objs: any = [];
    changeLog: string[] = [];
    subscription: any = null;

    getMenuData(value: any) {
        let starters = [0,0,0];
        for(let i=0; i<value.length; i++) {
            if(value[i].menu === 'Starter'){
                starters[0]+=1;
            } else if(value[i].menu === 'Main') {
                starters[1]+=1;
            } else if (value[i].menu === 'Dessert'){
                starters[2]+=1;
            }
        }
        return starters;
    }

    getAllergenData(value: any) {
        let objs: any = [];
        for(let i = 0; i<value.length; i++) {
            for(let j=0; j<value[i].allergens.length; j++){
                objs.push(value[i].allergens[j]);
            }
        }
       return this.uniq(objs);
    }

    uniq(a: any) {
        let prims: any = {"boolean":{}, "number":{}, "string":{}}
        return a.filter(function(item: any) {
            let type = typeof item;
            if(type in prims)
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
                return this.objs.indexOf(item) >= 0 ? false : this.objs.push(item);
        });
    }

    gotoMenu() {
        this._router.navigate(['restaurant', 'menu']);
    }

     getDetails() {
         this._rs.getRestaurant()
            .subscribe(
                data => {
                    this.restaurant = data;
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
                    this.restaurant = item;
                }
            }
        )

    }
}
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../shared/index';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives:[MD_CARD_DIRECTIVES, MD_LIST_DIRECTIVES]
})
export class RestaurantHomeComponent implements OnInit {
    constructor(private _rs:RestaurantService) { }

    restaurant: any = null;
    starters: number = 0;
    mains: number = 0;
    dessert: number = 0;
    allergens: string[] = [];
    final: any;
    objs: any = [];

    getMenuData(value: any) {
        for(let i=0; i<value.length; i++) {
            if(value[i].menu === 'Starter'){
                this.starters+=1;
            } else if(value[i].menu === 'Main') {
                this.mains+=1;
            } else if (value[i].menu === 'Dessert'){
                this.dessert+=1;
            }
        }
    }

    getAllergenData(value: any) {
        let objs = [];
        for(let i = 0; i<value.length; i++) {
            for(let j=0; j<value[i].allergens.length; j++){
                objs.push(value[i].allergens[j]);
            }
        }
        this.allergens = this.uniq(objs);
        console.log(this.allergens);
    }

    uniq(a: any) {
        let prims = {"boolean":{}, "number":{}, "string":{}}
        return a.filter(function(item: any) {
            let type = typeof item;
            if(type in prims)
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
                return this.objs.indexOf(item) >= 0 ? false : this.objs.push(item);
        });
    }

    ngOnInit() {
        if(this._rs.restaurant) {
            this.restaurant = this._rs.restaurant;
            this.getMenuData(this.restaurant.menu);
            this.getAllergenData(this.restaurant.menu);
        } else {
            this._rs.getRestaurant()
                .subscribe(
                    data => {
                        this.restaurant = data;
                        this._rs.restaurant = data;
                        this.getMenuData(this.restaurant.menu);
                        this.getAllergenData(this.restaurant.menu);
                    }
                )
        }
     }

}
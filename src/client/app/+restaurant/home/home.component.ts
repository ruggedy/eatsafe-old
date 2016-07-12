import { Component, OnInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
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
export class RestaurantHomeComponent implements OnInit, OnDestroy, OnChanges {
    constructor(private _rs:RestaurantService) { }

    restaurant: any = null;
    starters: number[] = null;
    allergens: string[] = null;
    final: any;
    objs: any = [];
    changeLog: string[] = [];

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
        let objs = [];
        for(let i = 0; i<value.length; i++) {
            for(let j=0; j<value[i].allergens.length; j++){
                objs.push(value[i].allergens[j]);
            }
        }
       return this.uniq(objs);
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

    

    ngOnDestroy(){
        this.restaurant = null;
        this.starters = null;
        this.allergens = null;
     }

    ngOnInit() {
        if(this._rs.restaurant && this._rs.menu) {
            console.log('this is data', this._rs.restaurant);
            this.starters = this.getMenuData(this._rs.restaurant.menu);
            this.allergens = this.getAllergenData(this._rs.restaurant.menu);
            this.restaurant = this._rs.restaurant;
        } else {
            this._rs.getRestaurant()
                .subscribe(
                    data => {
                        this.starters = this.getMenuData(data.menu);
                        this.allergens = this.getAllergenData(data.menu);
                        this.restaurant = data;
                        this._rs.restaurant = data;
                        this._rs.menu = data.menu;
                    }
                )
        }
     }

    ngOnChanges(changes: {[propName: string] : SimpleChange}){
        for(let propName in changes) {
            let chng = changes[propName];
             let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
        this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        console.log(this.changeLog);
        }
    }
}
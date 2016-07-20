import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { RestaurantService } from '../../shared/index';
import { PaginatePipe, PaginationControlsCmp, PaginationService, IPaginationInstance } from 'ng2-pagination';
@Component({
    moduleId: module.id,
    selector: 'sd-menu-show',
    templateUrl: 'menu-show.component.html',
    styleUrls: ['menu-show.component.css'],
    directives: [MD_CARD_DIRECTIVES, MD_CHECKBOX_DIRECTIVES, MD_BUTTON_DIRECTIVES, PaginationControlsCmp, ROUTER_DIRECTIVES],
    pipes: [PaginatePipe],
    providers: [PaginationService],
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

export class MenuShowComponent implements OnInit, OnDestroy {
    constructor(private _rs: RestaurantService, private _router: Router) { }

    menu: any[] = null;
    pageNumber: number = 1;
    checkedIds: any[] = [];
    checkedItems: any[] = [];
    showDelete: boolean = null;
    subscription: any = null;

    gotoNew(){
        this._router.navigate(['restaurant', 'menu/new']);
    }

    editMenu(value: any) {
        this._rs.menuEdit = value;
        this._router.navigate(['restaurant', 'menu/edit'])
    }

    removeMenu(value: any) {
        this._rs.deleteSingleMenu (value, value._id)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            )
    }

    validateChecked(menu: any){
        let index = this.checkedItems.indexOf(menu);

        if(index === -1) {
            return false
        }
        return true;
    }

    updateChecked(menu: any, event: any) {
        let index = this.checkedItems.indexOf(menu);

        if (event.checked) {
            if (index === -1) {
                this.checkedItems.push(menu);
                this.checkedIds.push(menu._id);
            }
        } else {
            if (index !== -1) {
                this.checkedItems.splice(index, 1)
                this.checkedIds.splice(index, 1)
            }
        }

        if (this.checkedItems.length > 0 ) {
            this.showDelete = true;
        } else {
            this.showDelete = false;
        }
    }

    removeMultiMenu() {
        this._rs.deleteMultipleMenu(this.checkedItems, this.checkedIds)
        .subscribe(
            data => data,
            error => console.log(error)
            
        )
        this.checkedIds = [];
        this.checkedItems = [];
        this.showDelete = false;
    }

    pageChanged(event:any) {
        this.pageNumber = event;
    }

    getDetails() {
            this._rs.getRestaurant()
                .subscribe(
                    data => {
                        this._rs.menu = data.menu;
                        this.menu = data.menu;
                        this._rs.restaurantChanged(data);
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
                    this._rs.menu = item.menu;
                    this.menu = item.menu;
                }
            }
        )   
    }
}
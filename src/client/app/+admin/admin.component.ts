import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';
import { PaginatePipe, PaginationControlsCmp, PaginationService, IPaginationInstance } from 'ng2-pagination';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

@Component({
	moduleId: module.id,
	selector: 'sd-admin',
	templateUrl: 'admin.component.html',
	styleUrls: ['admin.component.css'],
	directives: [MD_CARD_DIRECTIVES, MD_CHECKBOX_DIRECTIVES, MD_BUTTON_DIRECTIVES, PaginationControlsCmp],
    pipes: [PaginatePipe],
    providers: [PaginationService]
})
export class AdminComponent implements OnInit {
	
	users: any[] = null
    pageNumber: number = 1;
    checkedIds: any[] = [];
    checkedItems: any[] = [];
	checkedMenuItemsId: any[] = [];
    showDelete: boolean = null;

	constructor(private _as: AuthService, private _router: Router) { }

	validateChecked(menu: any){
        let index = this.checkedItems.indexOf(menu);

        if(index === -1) {
            return false
        }
        return true;
    }

    updateChecked(user: any, event: any) {
        let index = this.checkedItems.indexOf(user);
		let array: any[] = user.restaurant? user.restaurant.menu : [];

        if (event.checked) {
            if (index === -1) {
                this.checkedItems.push(user);
                this.checkedIds.push(user._id);
				array.forEach(item => {
					this.checkedMenuItemsId.push(item)
				});
			}
        } else {
            if (index !== -1) {
                this.checkedItems.splice(index, 1)
                this.checkedIds.splice(index, 1)
				array.forEach(item => {
					this.checkedMenuItemsId.splice(this.checkedMenuItemsId.indexOf(item), 1);
				});
            }
        }
		console.log(this.checkedMenuItemsId)

        if (this.checkedItems.length > 0 ) {
            this.showDelete = true;
        } else {
            this.showDelete = false;
        }
    }

	goHome() {
		this._router.navigate(['home']);
	}

	removeMultiUsers() {
        this._as.deleteMultipleUsers(this.checkedItems, this.checkedIds, this.checkedMenuItemsId)
			.subscribe(
				data => data,
				error => error
			)

		this.checkedIds = [];
        this.checkedItems = [];
        this.showDelete = false;
    }

	validateMultiUsers() {
        this._as.validateMultipleUsers(this.checkedItems, this.checkedIds)
			.subscribe(
				data => data,
				error => error
			)

		this.checkedIds = [];
        this.checkedItems = [];
        this.showDelete = false;
    }


	ngOnInit() {
		if(this._as.users) {
			this.users = this._as.users;
		} else {
			this._as.getUsers()
				.subscribe(
					data => {
						this.users = data;
						this._as.users = data;
					},
					error => error
				)
		}
	 }

}
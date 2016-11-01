import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../shared/index';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

@Component({
	moduleId: module.id,
	selector: 'sd-single-menu-show',
	templateUrl: 'single-menu-show.component.html',
	styleUrls: ['single-menu-show.component.css'],
	directives: [ MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES ],
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
export class SingleMenuShowComponent implements OnInit, OnDestroy {
	constructor( private route: ActivatedRoute, private router: Router, private _rs: RestaurantService) { }
	private sub: any = null

	private menu: any = null;

	editMenu(value: any) {
		this._rs.menuEdit = value;
        sessionStorage.setItem('menuEdit', JSON.stringify(value));
        this.router.navigate(['restaurant', 'menu/edit'])
    }

	removeMenu(value: any) {
        this._rs.deleteSingleMenu(value, value._id)
            .subscribe(
                data => data,
                error => error
            )
		this.router.navigate(['restaurant', 'menu']);
    }
	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			let id = params['id'];
			let newArr: any[] = null;
			if(!this._rs.menu) {
				this._rs.getRestaurant()
                .subscribe(
                    data => {
                        this._rs.menu = data.menu;
                        newArr = this._rs.menu.filter((item:any) => {
										return item._id === id;	
									});
						this.menu = newArr[0]; 
                        this._rs.restaurantChanged(data);
                    }
                )
			} else {
				newArr = this._rs.menu.filter((item:any) => {
					return item._id === id;	
				});
				this.menu = newArr[0];
			}
		});

		
	 }

}
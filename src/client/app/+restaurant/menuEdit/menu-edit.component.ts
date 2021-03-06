import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu, MenuFormComponent, RestaurantService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-menu-edit',
    templateUrl: 'menu-edit.component.html',
    styleUrls: ['menu-edit.component.css'],
    directives: [MenuFormComponent, REACTIVE_FORM_DIRECTIVES],
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

export class MenuEditComponent implements OnInit {
    active: boolean = false;
    menuId: any = null;
    init: Menu= new Menu(null, null, null);
    checked: string[] = [];

    constructor(private _router: Router, private _rs: RestaurantService) { }

    onMenuEdit(event: any) {
        this._rs.updateMenu(event, this.menuId)
            .subscribe(
                data  => {
                        this._rs.menuChanged(data);
                },
                error => error
            )
            
            this._router.navigate(['restaurant', 'menu'])
    }

    ngOnInit() { 
        if(sessionStorage.getItem('menuEdit')) {
            let value = JSON.parse(sessionStorage.getItem('menuEdit'));

            this.menuId = value._id;
            this.init.name = value.name;
            this.init.description = value.description;
            this.init.menu = value.menu;

            this.checked = value.allergens;
            this.active = true;
        }
    }

}
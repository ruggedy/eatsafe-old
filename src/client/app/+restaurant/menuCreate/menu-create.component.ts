import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Menu, MenuFormComponent, RestaurantService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-menu-create',
    templateUrl: 'menu-create.component.html',
    styleUrls: ['menu-create.component.css'],
    directives: [MenuFormComponent, REACTIVE_FORM_DIRECTIVES] 
})


@Component({
    moduleId: module.id,
    selector: 'sd-menu-create',
    templateUrl: 'menu-create.component.html'
})
export class MenuCreateComponent implements OnInit {

    init: Menu= new Menu(null, null, null);
    constructor(private _rs: RestaurantService) { }

    onMenuCreate(event: any) {
        this._rs.addMenu(event)
            .subscribe(
                data => {
                    this._rs.restaurant.menu.push(data);
                    console.log(this._rs.restaurant);
                },
                error => console.log(error)
            );
    }

    ngOnInit() { }

}
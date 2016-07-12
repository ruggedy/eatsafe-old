import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router } from '@angular/router';
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
    nav: string[] = ['restaurant', 'home']
    constructor(private _router: Router, private _rs: RestaurantService) { }

    onMenuCreate(event: any) {
        this._rs.addMenu(event)
            .subscribe(
                data => {    
                    this._rs.restaurant.menu.push(data);
                    console.log(this._rs.restaurant);
                },
                error => console.log(error)
            );
            this._router.navigate(['restaurant', 'home'])
    }

    ngOnInit() { }

}
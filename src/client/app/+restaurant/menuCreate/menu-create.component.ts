import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu, MenuFormComponent, RestaurantService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-menu-create',
    templateUrl: 'menu-create.component.html',
    styleUrls: ['menu-create.component.css'],
    directives: [MenuFormComponent, REACTIVE_FORM_DIRECTIVES],
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

export class MenuCreateComponent implements OnInit {

    init: Menu= new Menu(null, null, null);
    constructor(private _router: Router, private _rs: RestaurantService) { }

    onMenuCreate(event: any) {
        this._rs.addMenu(event)
            .subscribe(
                data => {    
                    this._rs.menuChanged(data);
                },
                error => console.log(error)
            );
            this._router.navigate(['restaurant', 'menu'])
    }

    ngOnInit() { }

}
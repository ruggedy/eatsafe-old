import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Menu, MenuFormComponent } from '../../shared/index';

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
    constructor() { }

    ngOnInit() { }

}
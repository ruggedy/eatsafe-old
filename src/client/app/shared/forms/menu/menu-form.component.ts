import { Component, OnInit, Input, Output } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms'
import { Menu } from './index';
@Component({
    moduleId: module.id,
    selector: 'sd-menu-form',
    templateUrl: 'menu-form.component.html',
    styleUrls: ['menu-form.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
export class MenuFormComponent implements OnInit {
    
    @Input() init: Menu= new Menu(null, null, 'Main');
    formActive: boolean = true;
    
    menu : Menu;
    menuForm: FormGroup;

    

    onSubmit() {
        console.log(this.menuForm.value);
    }    
    constructor() { }

    ngOnInit() {
        this.menuForm = new FormGroup({
            name: new FormControl(this.init? this.init.name : ''),
            description: new FormControl(this.init? this.init.description : ''),
            menu: new FormControl(this.init? this.init.menu : '')
        })
     }

}
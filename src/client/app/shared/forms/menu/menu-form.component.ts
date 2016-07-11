import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_RADIO_DIRECTIVES, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { Menu } from './index';
@Component({
    moduleId: module.id,
    selector: 'sd-menu-form',
    templateUrl: 'menu-form.component.html',
    styleUrls: ['menu-form.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES, MD_CHECKBOX_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_CARD_DIRECTIVES],
    providers: [MdUniqueSelectionDispatcher],
})
export class MenuFormComponent implements OnInit {
    
    @Input() init: Menu= new Menu(null, null, 'Main');
    @Output() value = new EventEmitter();
    @Input() checked: string[] = [];
    formActive: boolean = true;
    toggled: boolean = true;
    validChecked: boolean = true;
    
    allergens: any[] = [
        'Celery',
        'Cereals containing gluten',
        'Crustaceans',
        'Eggs',
        'Fish',
        'Lupin',
        'Milk',
        'Molluscs',
        'Mustard',
        'Nuts',
        'Peanuts',
        'Sesame seeds',
        'soya',
        'Sulphur dioxide',

    ]

    menu : Menu;
    menuForm: FormGroup;

    test() {
        console.log(this.menuForm.value)
    }

    toggle(){
        this.toggled = !this.toggled;
        console.log(this.toggled);
        if(this.toggled === false && this.checked[0] !== undefined) {
            this.validChecked = false;
        } else {
            this.validChecked = true;
        }
    }
    onSubmit() {
        this.value.emit({
            value: this.menuForm.value,
            checked: this.checked
        })
    }

    validateChecked(value: string){

        if(this.checked[0]){
            for(let i=0; i<this.checked.length; i++) {
                if(value === this.checked[i]) {
                    return true
                }
            }
        }
        return false;
    }

    updateRadio(value: any) {
        this.init.menu = value.value;
    }
      
    validateRadio(value: string){
        if(this.init.menu === value){
            return true;
        }
        return false;
    }  

    updateChecked(allergen:string, event:any){
        
        let index = this.checked.indexOf(allergen);
        if (event.checked) {
            if (index === -1) {
                this.checked.push(allergen);
            }
        } else {
            if (index !== -1) {
                this.checked.splice(index, 1)
            }
        }

        if(!this.toggled && this.checked[0] !== undefined){
            console.log(this.checked);
            this.validChecked = false;
        } else {
            this.validChecked = true;
        }
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
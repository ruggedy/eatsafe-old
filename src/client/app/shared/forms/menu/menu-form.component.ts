import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';
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
    @Input() nav: string[] = [];
    formActive: boolean = true;
    toggled: boolean = true;
    checkedClick: boolean = true;
    validChecked: boolean = true;
    
    allergens: any[] = [
        'Celery',
        'Gluten',
        'Crustaceans',
        'Eggs',
        'Fish',
        'Lupin',
        'Dairy',
        'Molluscs',
        'Mustard',
        'Nuts',
        'Peanuts',
        'Sesame',
        'Soya',
        'Sulphites',
    ]

    menu : Menu;
    menuForm: FormGroup;

    constructor(private _router:Router) { }

    disableToggle(){
        if(!this.menuForm.valid) {
            return true;
        }
        return false;
    }

    toggleCheckedClick(){
        return this.checkedClick = !this.checkedClick;
    }

    toggle(){
        this.toggled = !this.toggled;
        if(this.toggled === false) {
            this.validChecked = false;
        } else {
            this.validChecked = true;
        }
    }
    onSubmit() {
        if(this.menuForm.valid) {
            this.value.emit({
                value: this.menuForm.value,
                checked: this.checked
            });       
            return true;
        }
        return false;
        
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

    validateChecked2(value: string){

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
    }

    updateChecked2(allergen:string, event1:any){
        console.log(event);
        let index = this.checked.indexOf(allergen);
        if (event1) {
            if (index === -1) {
                this.checked.push(allergen);
            }
        } else {
            if (index !== -1) {
                this.checked.splice(index, 1)
            }
        }
    }

    ngOnInit() {
        this.menuForm = new FormGroup({
            name: new FormControl(this.init? this.init.name : '', Validators.required),
            description: new FormControl(this.init? this.init.description : '', Validators.required),
            menu: new FormControl(this.init? this.init.menu : '', Validators.required)
        })
     }

}
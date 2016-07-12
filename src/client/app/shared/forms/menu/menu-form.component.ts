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

    constructor(private _router:Router) { }

    disableToggle(){
        if(!this.menuForm.valid) {
            return true;
        }
        return false;
    }

    toggle(){
        this.toggled = !this.toggled;
        if(this.toggled === false && this.checked[0] !== undefined) {
            this.validChecked = false;
        } else {
            this.validChecked = true;
        }
    }
    onSubmit() {
        if(this.checked.length > 1 && this.menuForm.valid) {
            this.value.emit({
                value: this.menuForm.value,
                checked: this.checked
            });       
            return true;
        }
        console.log("Something Went terribly Wrong, you need to go die now"); // TODO: Defo Remove .. if found in Prod, Hunt <= this guy down.
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

    updateRadio(value: any) {
        this.init.menu = value.value;
        console.log(this.init.menu);
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
            this.validChecked = false;
        } else {
            this.validChecked = true;
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
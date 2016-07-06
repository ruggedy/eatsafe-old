import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms'
import { Registration } from './index';

@Component({
    moduleId: module.id,
    selector: 'sd-registration-form',
    templateUrl: 'registration-form.component.html',
    styleUrls: ['registration-form.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]

})
export class RegistrationFormComponent implements OnInit {
    
    formActive: boolean = true;

    registration: Registration;
    
    registrationForm: FormGroup;
    constructor() { }

    onSubmit(){

    }

    ngOnInit() { 
        this.registrationForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        })
    }

}
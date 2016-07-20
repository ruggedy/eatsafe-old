import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators} from '@angular/forms'
import { Registration, RegInput,FormValidator } from '../../index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-registration-form',
    templateUrl: 'registration-form.component.html',
    styleUrls: ['registration-form.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]

})
export class RegistrationFormComponent implements OnInit {
    
    heading: string = 'heading';
    formActive: boolean = true;
    @Input() loginError: boolean = false;
    @Input() details: RegInput;
    @Input() asyncVal: boolean = true;
    @Output() user = new EventEmitter();
    registration: Registration;
    
    registrationForm: FormGroup;
    constructor(private _router: Router) { }

    onSubmit(){
        this.user.emit ({
            value: this.registrationForm.value
        });
    }

    ngOnInit() { 
        this.registrationForm = new FormGroup({
            username: new FormControl('',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)]), this.asyncVal? Validators.composeAsync([FormValidator.checkUsername]) : Validators.composeAsync([])),
            matchingPassword: new FormGroup({
                password: new FormControl('',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])),
                confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)]))
            }, {'random': true}, FormValidator.matchPasswords)             
        })
    }
}
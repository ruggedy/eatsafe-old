import { Component, OnInit } from '@angular/core';
import { RegistrationFormComponent} from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css'],
    directives: [RegistrationFormComponent]
})
export class SignUpComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
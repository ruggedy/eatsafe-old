import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class RegistrationComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
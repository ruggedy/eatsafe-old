import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { AuthService } from '../../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    isValidated: boolean = false;
    isLoggedIn: boolean = false;
    constructor(private _as: AuthService){}

    ngOnInit () {
      this.isValidated = this._as.isValidated();
      this.isLoggedIn = this._as.isLoggedIn();
    }

}

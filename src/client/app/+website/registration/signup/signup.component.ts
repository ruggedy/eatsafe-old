import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationFormComponent, AuthService, RegInput} from '../../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css'],
    directives: [RegistrationFormComponent]
})
export class SignUpComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) { }

    formActive: boolean = true;
    input:RegInput = new RegInput('Sign Up', 'Already Have An Account', 'Sign In', true, '#', 'Register');
    

    onCreate(event:any){
        console.log(event.value);
        this._authService.signup(event.value)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.obj);
                    localStorage.setItem('userId', data.userId);
                    this._router.navigate(['/restaurant']);
                },
                error => console.log(error)
            );
    }
    ngOnInit() {
     }

}
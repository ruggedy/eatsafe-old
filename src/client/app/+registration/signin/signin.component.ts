import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationFormComponent, AuthService, RegInput} from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css'],
    directives: [RegistrationFormComponent]
})
export class SignInComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) { }

    formActive: boolean = true;
    input:RegInput = new RegInput('Sign In', `Don't Already Have An Account`, 'Sign Up', false, '#', 'Login');
    

    onCreate(event:any){
        console.log(event.value);
        this._authService.signin(event.value)
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
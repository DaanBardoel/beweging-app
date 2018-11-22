import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {LoginService} from '../../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    isReadyToSave: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private loginService: LoginService,
        private alertService: AlertService) {
        if (this.authenticationService.currentAccountValue) {
            this.router.navigate(['/home']);
        } else {
            this.loginForm = this.formBuilder.group({
                username: ['', [Validators.required]],
                password: ['', [Validators.required]]
            });

            this.loginForm.valueChanges.subscribe((v) => {
                this.isReadyToSave = this.loginForm.valid;
            });
        }
    }


    ngOnInit() {
    }


    get f() {
        return this.loginForm.controls;
    }

    public onLogin(): void {

        console.log(this.loginForm.getRawValue());
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        try {
            (this.loginService.login(this.loginForm.value));
            this.alertService.success('Logged in!', true);
            this.router.navigate(['home']);
        } catch (err) {
            console.log(err);
        }
    }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../services/login/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {AlertService} from '../../services/alert/alert.service';
import {AccountService} from '../../services/account/account.service';

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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private authenticationService: AuthenticationService,
        private accountService: AccountService,
        private alertService: AlertService) {
        if (this.authenticationService.currentAccountValue) {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    public onLogin(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.loginService.login(this.loginForm.value);
    }

}

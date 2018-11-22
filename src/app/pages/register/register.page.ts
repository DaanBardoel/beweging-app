import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {AccountService} from '../../services/account/account.service';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private accountService: AccountService,
        private alertService: AlertService) {
        if (this.authenticationService.currentAccountValue) {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            gender: [''],
            age: ['', [Validators.min(1), Validators.max(124)]],
            town: ['', Validators.required],
            district: ['']
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        try {
            (this.accountService.register(this.registerForm.value));
            this.alertService.success('Registratie is gelukt', true);
            this.router.navigate(['/login']);
        } catch (err) {
            console.log(err);
        }
    }
}

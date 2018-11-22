import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {AccountService} from '../../services/account/account.service';

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
        private accountService: AccountService) {
        if (this.authenticationService.currentAccountValue) {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            gender: new FormControl(''),
            age: new FormControl('', [Validators.min(1), Validators.max(124)]),
            town: new FormControl('', [Validators.required]),
            district: new FormControl('')
        });
    }

    onSubmit() {
        this.submitted = true;


        console.log(this.registerForm.getRawValue());

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.registerForm.value);
    }
}

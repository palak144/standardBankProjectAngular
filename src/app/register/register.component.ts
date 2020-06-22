import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-watch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthService,
      private userService: UserService,
      private toastr: ToastrService,
      ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          email: new FormControl('', [
              Validators.required,
              Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
          password: ['', [Validators.required, Validators.minLength(6)]],
          rePassword: ['', Validators.required],
        }, {
          validator: MustMatch('password', 'rePassword')
    
        }  )}

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.toastr.success('Registration successful');
                  this.router.navigate(['/login']);
              },
              error => {
                  this.toastr.error(error);
              });
  }

}

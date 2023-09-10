import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth-guard/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form!: FormGroup;
  isRegistering = false;
  isRecoveringPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    this.isRegistering = true;
  
    this.authService
      .register({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe({
        next: () => {
          this.authService.sendVerificationMail();
          this.router.navigate(['login']);
        },
        error: (error: any) => {
          this.isRegistering = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 5000,
          });
        },
      });
  }

  recoverPassword() {
    this.isRecoveringPassword = true;

    this.authService.recoverPassword(this.form.value.email).subscribe({
      next: () => {
        this.isRecoveringPassword = false;
        this.snackBar.open(
          'You can recover your password in your email account.',
          'OK',
          {
            duration: 5000,
          }
        );
      },
      error: (error: any) => {
        this.isRecoveringPassword = false;
        this.snackBar.open(error.message, 'OK', {
          duration: 5000,
        });
      },
    });
  }
}

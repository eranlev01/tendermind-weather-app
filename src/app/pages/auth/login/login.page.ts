import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/shared/auth-guard/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    
  }

  async login() {
    this.isLoggingIn = true;
    const loading = await this.loadingController.create();
		await loading.present();
    await this.authService
      .login({
        email: this.form.value.email,
        password: this.form.value.password,
      }).subscribe()
    await loading.dismiss();
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

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  first,
  from,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.checkAuth();
  }

  async checkAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.isAuthenticated.next(true);
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          resolve(true);
        } else {
          this.isAuthenticated.next(false);
          localStorage.setItem('user', 'null');
          resolve(false);
        }
      });
    });
  }

  login(params: Login): Observable<any> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        } else {
          return from(
            this.auth.signInWithEmailAndPassword(params.email, params.password)
          ).pipe(
            concatMap(() => {
              return of(true);
            }),
            catchError((error: FirebaseError) =>
              throwError(
                () => new Error(this.translateFirebaseErrorMessage(error))
              )
            )
          );
        }
      }),
      first(),
      tap((authenticated) => {
        if (authenticated) this.isAuthenticated.next(true);
        this.router.navigateByUrl('/weather', { replaceUrl: true });
      })
    );
  }

  register(params: Register): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(params.email, params.password)
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  sendVerificationMail(): Promise<any> {
    return this.auth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === 'auth/user-not-found') {
      return 'User not found.';
    }
    if (code === 'auth/wrong-password') {
      return 'Wrong Password';
    }
    return message;
  }
}

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
};

type FirebaseError = {
  code: string;
  message: string;
};

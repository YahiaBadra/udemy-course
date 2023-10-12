import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

interface Response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    const url = 'signUp';
    return this.auth(email, password, url);
  }
  login(email: string, password: string) {
    const url = 'signInWithPassword';
    return this.auth(email, password, url);
  }

  private auth(email: string, password: string, url: string) {
    return this.http
      .post<Response>(
        'https://identitytoolkit.googleapis.com/v1/accounts:' +
          url +
          '?key=AIzaSyBQSlT6EYHEgVFgCD_U1SN3uuiwAvL_zIY',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap(() => {})
      );
  }

  handelError(errorRs: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    console.log(errorRs.error.error.message);

    if (!errorRs.error || !errorRs.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRs.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'this password is not correct.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials';
        break;
    }
    return throwError(errorMessage);
  }
}
// function Tap(
//   arg0: () => void
// ): import('rxjs').OperatorFunction<Response, unknown> {
//   throw new Error('Function not implemented.');
// }

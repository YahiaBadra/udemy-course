import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from './user.model';

export interface Response {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

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
          '?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handelError(errorRs: HttpErrorResponse) {
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

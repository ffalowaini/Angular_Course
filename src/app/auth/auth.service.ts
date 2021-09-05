import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenTimer: any
  // token: string = null;
  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, pass: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9dRX6DOMnPC4gChYYwHEQIWKlF7Qw_g8',
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    ).pipe(catchError(error => {
      console.log(error);

      if (!error.error || !error.error.error) {
        return throwError('unknown Error!');
      }
      return throwError(error.error.error.message);

    }), tap(resData => {
      const expire = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expire);
      this.user.next(user);
      this.autoLogout(+resData.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));

    }));
  }

  login(email: string, pass: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9dRX6DOMnPC4gChYYwHEQIWKlF7Qw_g8',
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }).pipe(catchError(error => {
        console.log(error);

        if (!error.error || !error.error.error) {
          return throwError('unknown Error!');
        }
        return throwError(error.error.error.message);

      }
      ), tap(resData => {
        const expire = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expire);
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

      })
      )
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationData: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {

      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationData));

    if (userData._token) {
      const expire = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
      this.autoLogout(expire);

      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.clear();
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);

  }
}

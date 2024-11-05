import { Injectable } from '@angular/core';

import { SessionStoreService } from './session-store.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionStoreService: SessionStoreService
  ) {}

  login(body: any): void {
    this.http
      .post<any>('http://localhost:5001/api/auth/login', body)
      .subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          const { token, ...rest } = response;
          //update store
          this.sessionStoreService.setAccessToken(token);
          this.sessionStoreService.setIsLoggedIn(true);

          //fetch user;
          this.getUser();
          //navigate to default page
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('Something went wrong', error);
        },
      });
  }
  getUser(): void {
    const token =
      this.sessionStoreService.getAccessToken() ??
      localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login-temp']);
      return;
    }
    this.http
      .get<any>('http://localhost:5001/api/auth/user', {
        headers: new HttpHeaders({
          Authorization: `${token}`,
        }),
      })
      .subscribe({
        next: (userResponse) => {
          this.sessionStoreService.setSessionStore({
            accessToken: token,
            isLoggedIn: true,
            userData: userResponse,
          });
        },
        error: (error) => {
            console.log('Something went wrong', error);
          this.router.navigate(['/login-temp']);
        },
      });
  }
}

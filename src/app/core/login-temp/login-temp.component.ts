import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStoreService } from '../../Services/session-store.service';

@Component({
  selector: 'login-temp',
  standalone: true,
  templateUrl: './login-temp.component.html',
  styleUrls: ['./login-temp.component.less'],
  imports: [FormsModule, HttpClientModule],
})
export class LoginTempComponent {
  email: string = 'admin@admin.com';
  password: string = 'password';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionStoreService: SessionStoreService,
  ) {}

  loginHandler(): void {
    this.http
      .post<any>('http://localhost:5001/api/auth/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          const { token, ...rest } = response;
          //update store
          this.sessionStoreService.setAccessToken(token);
          this.sessionStoreService.setIsLoggedIn(true);

          //fetch user;
          this.fetchUser();
          //navigate to default page
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('Something went wrong', error);
        },
      });
  }
  fetchUser(): void {
    const token = this.sessionStoreService.getAccessToken();
    if(!token){
      //redirect to login page
      return
    }
    this.http
    .get<any>(
      'http://localhost:5001/api/auth/user',
      {
        headers: new HttpHeaders({
          Authorization: `${token}`, // Adding the token to the Authorization header
        }),
      }
    )
    .subscribe((userResponse) => {
      this.sessionStoreService.setUserData(userResponse);
      this.sessionStoreService.setSessionStore(this.sessionStoreService.getSessionStore());
    });
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { CommonService } from '../../Services/common.service';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AgGridAngular,FormsModule,HttpClientModule, NgIf ],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  email: string = ''; // Property to bind with email input
  chart: any;
  apiResponse: any;
  getEmail: any;
  showPasswordLogin: boolean = false;
  showEmail: boolean = true;
  password: any;
  finalResponse: any;
  newpassword: any;
  salt: any;
  constructor(
    private apiService: ApiService,
    public router: Router,
    public commonService: CommonService
  ) {}

  login(): void {
    this.apiService.login(this.email).subscribe(
      (response: any) => {
        if (response.authType === 0) {
          this.showPasswordLogin = true;
          this.showEmail = false;
          if (this.email && this.password) {
            this.passwordLogin();
          } else if (response.status === 'success' && response.authType === 1) {
            this.email = '';
            this.loginWithGoogle(response.redirectUrl);
            this.finalResponse = response.result.flag;
          }
        } else {
          const accessToken = response.data.token.replace(/"/g, '');
          localStorage.setItem('accessToken', accessToken);

          this.apiService.signInAPI(this.email, 54).subscribe(
            (res: any) => {
              if (res.result.status === 'success' && res.result.statusCode === 1) {
                this.router.navigate(['/home']);
              }
              console.log('API response:', res);
            },
            (error: HttpErrorResponse) => {
              console.error('Sign in API error:', error);
            }
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.email = '';
        console.error('Login error:', error);
      }
    );
    console.log('Logging in with email:', this.email);
  }

  passwordLogin(): void {
    this.apiService.signToGetToken(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Email & Password:', this.email, this.password);
        const accessToken = response.data.token.replace(/"/g, '');
        localStorage.setItem('accessToken', accessToken);

        if (response.result.flag === '1' && response.result !== null) {
          this.apiService.signInAPI(this.email, 2).subscribe(
            (res: any) => {
              if (res?.result?.status === 'success' && res.result.statusCode === 1) {
                this.router.navigate(['/home']);
              } else {
                console.log('Unexpected response', res);
              }
            },
            (error: HttpErrorResponse) => {
              console.error('API call failed', error);
            }
          );
        } else {
          console.error('Response flag is not 1', response);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Password login error:', error);
      }
    );
    console.log('Password login');
  }

  loginWithGoogle(redirectUrl: string): void {
    window.location.href = redirectUrl;
  }
}

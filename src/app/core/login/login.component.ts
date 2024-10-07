import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { CommonService } from '../../Services/common.service';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AgGridAngular,FormsModule,HttpClientModule, NgIf ],
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
  constructor(private apiService: ApiService, public router: Router, public commonService: CommonService) { }
  login() {
    this.apiService.login(this.email).subscribe(
      (response: any) => {
        // Handle successful login response
        //this.router.navigate(['/', "main-page"]);
        if (response.authType === 0) {
          this.showPasswordLogin = true;
          this.showEmail = false;
          if (this.email != '' && this.password != '' && this.password != undefined) {
            this.passwordLogin();
          }
          else if (response.status === "success" && response.authType == 1) {
            this.email = '';
            this.loginWithGoogle(response.redirectUrl);
            this.finalResponse = response.result.flag
            //window.location.href = redirectUrl;
          }
        }
        else {
          var accessToken = response.data.token.replace(/"/g, '');
          localStorage.setItem('accessToken', accessToken);
          // After successful login
 
          this.apiService.signInAPI(this.email, 54).subscribe((res: any) => {
            if (res.result.status == 'success' && res.result.statusCode == 1) {
              this.router.navigate(['/', "home"]);
            }
            console.log('res', res)
          })
          //this.email = '';
          //this.router.navigate(['/', "login"]);
        }
      },
      error => {
        // Handle login error
        this.email = '';
        console.error('Login error:', error);
      }
    );
    console.log('Logging in with email:', this.email);
    // Reset the email input after login
    //this.email = '';
  }
 
  passwordLogin() {
    //this.salt = this.commonService.createSalt();
    //console.log('inputpassword', this.password)
    //this.password = this.commonService.ConcatPassword(this.password, this.salt);
    //console.log('saltpassword', this.password)
    this.apiService.signToGetToken(this.email, this.password).subscribe(
      (response: any) => {
        console.log('payload', this.email, this.password)
        var accessToken = response.data.token.replace(/"/g, '');
        localStorage.setItem('accessToken', accessToken);
        // After successful login
        if (response.result.flag === '1' && response.result != null) {
          this.apiService.signInAPI(this.email, 2).subscribe(
            (res: any) => {
              if (res && res.result) {
                if (res.result.status === 'success' && res.result.statusCode === 1) {
                  this.router.navigate(['/home']);
                } else {
                  console.log('Unexpected response', res);
                }
              } else {
                console.error('Response is null or does not contain result', res);
              }
            },
            (error) => {
              console.error('API call failed', error);
            }
          );
        } else {
          console.error('Response flag is not 1', response);
        }
 
        // Handle successful login response
        //this.router.navigate(['/', "home"]);
 
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
    console.log('Password login');
  }
  loginWithGoogle(redirectUrl: string) {
    // Redirect the user to Google login page
    window.location.href = redirectUrl;
  }
}

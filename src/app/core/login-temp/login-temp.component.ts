import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
} from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';

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
    private authService: AuthService
  ) {}

  loginHandler(): void {
    const reqBody = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(reqBody);
  }
}

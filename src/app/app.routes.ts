import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { LoginTempComponent } from './core/login-temp/login-temp.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login-temp', component: LoginTempComponent },
    { path: 'login', component: LoginComponent },
  
    //{ path: 'timecode', component: TimeCodeComponent },
    {
      path: 'home', component: HomeComponent,
    },
  ];

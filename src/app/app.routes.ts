import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
  
    //{ path: 'timecode', component: TimeCodeComponent },
    {
      path: 'home', component: HomeComponent,
    },
  ];

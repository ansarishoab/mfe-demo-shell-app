import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AgGridAngular],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
 
}

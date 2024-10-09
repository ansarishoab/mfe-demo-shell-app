import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AgGridAngular,NgIf],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.less'
})
export class BaseLayoutComponent {
  constructor(private router: Router) {}
  excludeHeaderFooter:string[] = ['/login'];
  currentRouterPath:string = '/';

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd)) // Only log when navigation ends
    .subscribe((event: any) => {
      console.log('Updated route:', event.urlAfterRedirects); // Log the updated route
      this.currentRouterPath = event.urlAfterRedirects ?? event.url;
    });
    this.loadScript('assets/js/app.min.js');
    this.loadScript('assets/js/hyper-config.js');
    this.loadScript('assets/js/vendor.min.js');
  }
  private loadScript(src: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

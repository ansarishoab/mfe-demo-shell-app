import { Component } from '@angular/core';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { RouterOutlet, Router, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';
import { BaseLayoutComponent } from './core/base-layout/base-layout.component';
import { LoginComponent } from './core/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseLayoutComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],  // Changed from 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  title = 'shell-app';

  constructor(private router: Router) {}

  ngOnInit() {
    // debugger
    const dynamicRoutes: any = environment.dynamicRoutes.map((r) => {
      return {
        path: r.path,
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: r.remoteEntry,
            exposedModule: r.exposedModule,
          })
            .then((m) => m[r.returnedModule])
            .catch((err) => {
              console.error(`Error loading remote module: ${r.path}`, err);
              return null;  // Handle this appropriately (e.g., show error page)
            }),
      };
    });

    // Handle 404 page (wildcard route)
    const wildCardRoute: any = {
      path: '**',
      component: PageNotFoundComponent,
    };

    // Resetting router config to dynamically add remote routes
    this.router.resetConfig([
      ...this.router.config,
      ...dynamicRoutes,
      wildCardRoute,
    ]);
  }
}

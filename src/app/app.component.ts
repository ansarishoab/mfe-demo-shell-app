import { Component } from '@angular/core';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { RouterOutlet, Router, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'shell-app';

  constructor(private router: Router) {}

  ngOnInit() {
    const dynamicRoutes: any = environment.dynamicRoutes.map((r) => {
      return {
        path: r.path,
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: r.remoteEntry,
            exposedModule: r.exposedModule,
          }).then((m) => m[r.returnedModule]),
      };
    });

    const wildCardRoute: any = {
      path: '**',
      component: PageNotFoundComponent,
    };
    this.router.resetConfig([
      ...this.router.config,
      ...dynamicRoutes,
      wildCardRoute,
    ]);
  }
}

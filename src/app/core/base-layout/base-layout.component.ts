import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,AgGridAngular],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.less'
})
export class BaseLayoutComponent {
  ngOnInit() {
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

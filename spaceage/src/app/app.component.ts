import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spaceage';
  renderWholePage = false;
  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
    .subscribe({
      next: (event: any) => {
        console.log('navigation event', event);
        if (event?.url === '/barcode') {
          this.renderWholePage = true;
        } else {
          this.renderWholePage = false;
        }
      }
    });
  }
}

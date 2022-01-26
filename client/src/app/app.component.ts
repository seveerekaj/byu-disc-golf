import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav') sideNav!: MatSidenav;
  title = 'Byu Disc Golf';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((a) => a instanceof NavigationEnd))
      .subscribe(() => this.sideNav.close());
  }
}

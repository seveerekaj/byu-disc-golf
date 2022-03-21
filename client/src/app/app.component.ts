import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GroupService } from './group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav') sideNav!: MatSidenav;
  title = 'BYU Disc Golf Course';

  constructor(private router: Router, private groupService: GroupService) {
    this.router.events
      .pipe(filter((a) => a instanceof NavigationEnd))
      .subscribe(() => this.sideNav.close());
  }

  leaveGame(){
    this.groupService.clearData();
    this.router.navigateByUrl('/home')
  }
}

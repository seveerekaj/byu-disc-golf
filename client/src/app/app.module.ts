import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { HoleInfoComponent } from './hole-info/hole-info.component';
import { HolesComponent } from './holes/holes.component';
import { HoleDetailsComponent } from './hole-details/hole-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HoleInfoComponent,
    HolesComponent,
    HoleDetailsComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    GoogleMapsModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

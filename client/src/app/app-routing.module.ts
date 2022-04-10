import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighScoreComponent } from './high-score/high-score.component';
import { HoleInfoComponent } from './hole-info/hole-info.component';
import { HolesComponent } from './holes/holes.component';
import { HomeComponent } from './home/home.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component'

const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home',
  },
  {
    component: HoleInfoComponent,
    path: 'hole/:id',
  },
  {
    component: HolesComponent,
    path: 'holes',
  },
  {
    component: ScoreboardComponent,
    path: 'scores',
  },
  {
    component: HighScoreComponent,
    path: 'high-score',
  },
  {
    redirectTo: '/home',
    path: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

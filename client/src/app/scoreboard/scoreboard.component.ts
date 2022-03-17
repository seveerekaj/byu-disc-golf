import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { ScoreboardWrapper } from '../scoreboard'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent implements OnInit {

  readonly SCOREBOARD_URL = '/api/group/group-id/';
  // todo: call endpoint with actual group Id instead of hard-coded 1234
  scoreboard$ = this.http.get<ScoreboardWrapper>(this.SCOREBOARD_URL + "1234").pipe(pluck('players'));

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

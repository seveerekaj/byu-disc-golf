import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { HighScoreResponse } from '../scoreboard';

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.css']
})
export class HighScoreComponent implements OnInit {

  highScores$ = this.http.get<HighScoreResponse>('/api/score/').pipe(pluck('scoreBoard'));
  columnsToDisplay = ['initials','finalScore'];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

}

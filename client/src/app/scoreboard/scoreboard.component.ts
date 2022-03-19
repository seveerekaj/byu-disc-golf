import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { ScoreboardWrapper } from '../scoreboard'

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent implements OnInit {

  readonly SCOREBOARD_URL = '/api/group/group-id/';
  // todo: call endpoint with actual group Id isnstead of hard-coded 1234
  scoreboard$ = this.http.get<ScoreboardWrapper>(this.SCOREBOARD_URL + "1").pipe(map(result=>{
    const final = [];
    for(let player of result.players){
      const item = {
        player: player.nickName,
        scores: result.scoreboard[player.playerID],
        total: result.scoreboard[player.playerID].reduce((acc,score)=>acc+score.score,0)
      }
      final.push(item);
    }
    return final;
  }));

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}

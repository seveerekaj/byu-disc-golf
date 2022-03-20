import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, switchMap } from 'rxjs/operators';
import { ScoreboardWrapper } from '../scoreboard'
import { GroupService } from '../group.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent implements OnInit {

  readonly SCOREBOARD_URL = '/api/group/group-id/';
  // todo: call endpoint with actual group Id isnstead of hard-coded 1234
  scoreboard$ = this.groupService.groupId$.pipe(
    switchMap(groupId => {
      return this.http.get<ScoreboardWrapper>(this.SCOREBOARD_URL + groupId).pipe(map(result => {
        const final = [];
        for (let player of result.players) {
          const item = {
            player: player.nickName,
            scores: result.scoreboard[player.playerID],
            total: result.scoreboard[player.playerID].reduce((acc, score) => acc + score.score, 0)
          }
          final.push(item);
        }
        return final;
      }));

    })
  )

  constructor(private http: HttpClient, private groupService: GroupService) { }

  ngOnInit(): void {
  }

}

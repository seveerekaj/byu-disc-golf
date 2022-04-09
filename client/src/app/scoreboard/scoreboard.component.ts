import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, switchMap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { ScoreboardWrapper } from '../scoreboard'
import { CourseWrapper } from '../goal';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent {

  readonly SCOREBOARD_URL = '/api/group/group-id/';
  readonly HOLES_URL = '/api/course/';

  allHoles$ = this.http.get<CourseWrapper>(this.HOLES_URL).pipe(pluck('course'), shareReplay(1));
  scoreboard$ = this.groupService.groupId$.pipe(
    switchMap(groupId => {
      return this.http.get<ScoreboardWrapper>(this.SCOREBOARD_URL + groupId).pipe(
        withLatestFrom(this.allHoles$),
        map(([result, allHoles]) => {
          const final = [];
          for (let player of result.players) {
            const item = {
              playerId: player.playerID,
              player: player.nickName,
              scores: result.scoreboard[player.playerID]
                .map(score => ({
                  ...score,
                  par: allHoles.find(hole => hole.holeId === score.hole)!.par
                })),
              total: result.scoreboard[player.playerID]
                .reduce((acc, score) => (
                  acc
                  + score.score
                  - allHoles.find(hole => hole.holeId === score.hole)!.par
                ), 0),
              totalThrows: result.scoreboard[player.playerID].reduce((acc, score) => acc + score.score, 0),
            }
            final.push(item);
          }
          final.sort((a, b) => {
            return a.total - b.total;
          });
          return final;
        }));
    })
  )

  columnsToDisplay = ['hole', 'par', 'throws',];

  constructor(private http: HttpClient, public groupService: GroupService) { }


  submitHighScore(initials: string) {
    this.scoreboard$.pipe(
      withLatestFrom(this.groupService.playerId$),
      map(([board, playerId]) => board.find(user => user.playerId === playerId)),
      switchMap(player => {
        return this.http.post('/api/score/post-score', {
          initials,
          finalScore: player?.total
        });
      })
    ).subscribe();
  }
}

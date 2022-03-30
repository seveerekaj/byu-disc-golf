import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map, switchMap } from 'rxjs/operators';
import { ScoreboardWrapper } from '../scoreboard'
import { CourseWrapper, Goal } from '../goal';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent implements OnInit {

  readonly SCOREBOARD_URL = '/api/group/group-id/';
  readonly HOLES_URL = '/api/course/';

  allHoles$: any;
  scoreboard$: any;

  columnsToDisplay = ['hole', 'throws'];

  constructor(private http: HttpClient, private groupService: GroupService) { }

  ngOnInit(): void {
    this.getCourse();
    console.log("allHoles$--------------------->")
    console.log(this.allHoles$)
    // this.getScoreboard();
  }

  getCourse() {
    // this.allHoles$ = this.http.get<CourseWrapper>(this.HOLES_URL).pipe(pluck('course')).subscribe(() => this.getScoreboard());
    this.http.get<CourseWrapper>(this.HOLES_URL).subscribe(data => {
      this.allHoles$ = data.course;
      this.getScoreboard();
    });
    // this.getScoreboard();
  }

  getScoreboard() {
    this.scoreboard$ = this.groupService.groupId$.pipe(
      switchMap(groupId => {
        return this.http.get<ScoreboardWrapper>(this.SCOREBOARD_URL + groupId).pipe(map(result => {
          const final = [];
          for (let player of result.players) {
            const item = {
              player: player.nickName,
              scores: result.scoreboard[player.playerID],
              total: result.scoreboard[player.playerID].reduce((acc, score) => acc + score.score - this.allHoles$.find((elem: Goal) => elem.holeId === score.hole), 0)
              // total: result.scoreboard[player.playerID].reduce((acc, score) => acc + score.score, 0)
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
  }

}

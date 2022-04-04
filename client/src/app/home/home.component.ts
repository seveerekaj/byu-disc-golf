import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'browserslist';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startGame(name: string, code: string) {
    const responseHandler = (data: Group) => {
      console.log(data);
      this.group.setGroupCode(data.groupCode);
      this.group.setGroupId(data.groupId);
      this.group.setNickname(data.nickname);
      this.group.setPlayerId(data.playerId);

      this.router.navigate(["/hole/1"]);
    }

    if (code == "") {
      this.http.post<Group>("/api/group/new-group", { "nickname": name }).subscribe(responseHandler)
    } else {
      this.http.post<Group>("/api/group/join-group", { "nickname": name, "group-code": code }).subscribe(responseHandler)
    }
  }

  constructor(private http: HttpClient, private router: Router, private group: GroupService) {
  }

  ngOnInit(): void {
  }

}

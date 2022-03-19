import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'browserslist';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response: any;
  startGame(name:string, code:string) {
    if (code == ""){
      this.http.post("/api/group/new-group", {"nickname" : name}).subscribe((data)=>  {

      this.response=data;
      console.log("new", this.response.groupCode);

      this.group.groupCode= this.response.groupCode;
      this.group.groupId= this.response.groupId;
      this.group.nickName= this.response.nickName;

      this.router.navigate(["/hole/1"]);
    })
  } else {
    this.http.post("/api/group/join-group", {"nickname" : name}).subscribe((data)=>  {
      this.response=data;
      console.log("joinGroup");

      this.group.groupCode= this.response.groupCode;
      this.group.groupId= this.response.groupId;
      this.group.nickName= this.response.nickName;
      
      this.router.navigate(["/hole/1"]);
    })
  } 
  }

  constructor(private http:HttpClient, private router:Router, private group:GroupService) { 
  }

  ngOnInit(): void {
  }

}

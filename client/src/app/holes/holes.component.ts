import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseWrapper } from '../goal';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-holes',
  templateUrl: './holes.component.html',
  styleUrls: ['./holes.component.css']
})
export class HolesComponent implements OnInit {
  readonly HOLES_URL = '/api/course/';
  allHoles$: any = this.http.get<CourseWrapper>(this.HOLES_URL).pipe(pluck('course'));
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}
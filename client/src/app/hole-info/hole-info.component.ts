import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../goal';
import { pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hole-info',
  templateUrl: './hole-info.component.html',
  styleUrls: ['./hole-info.component.css']
})
export class HoleInfoComponent implements OnInit {

  mapType = google.maps.MapTypeId.SATELLITE;
  readonly GOAL_URL = '/api/course/hole/';
  goal: any;
  holeNumber: any;
  hole$ = this.route.params
    .pipe(pluck("id"),
      switchMap(holeNumber => {
        return this.http.get<{ hole: Goal }>(this.GOAL_URL + holeNumber)
      }));

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.holeNumber = this.route.snapshot.paramMap.get('id');

    // TODO: query the backend for hole with this id
  }

}

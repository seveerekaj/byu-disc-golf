import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../goal';
import { GoogleMap } from '@angular/google-maps';

import { pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hole-info',
  templateUrl: './hole-info.component.html',
  styleUrls: ['./hole-info.component.css']
})
export class HoleInfoComponent implements OnInit {

  readonly GOAL_URL = '/api/course/hole/';
  goal: any;
  holeNumber: any;
  center: any;


  hole$ = this.route.params
  .pipe(pluck("id"),
  switchMap(holeNumber=>{
    return this.http.get<any>(this.GOAL_URL + holeNumber)
  }));

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  mapOptions = {
    disableDefaultUI: true,
    mapTypeId: 'satellite'
  }

  ngOnInit(): void {
    this.holeNumber = this.route.snapshot.paramMap.get('id');
    //current location
    /*navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })*/
        // TODO: query the backend for hole with this id
  }

}

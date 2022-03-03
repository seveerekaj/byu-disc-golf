import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Goal, GoalWrapper } from '../goal';
import { GoogleMap } from '@angular/google-maps';

import { pluck, switchMap, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hole-info',
  templateUrl: './hole-info.component.html',
  styleUrls: ['./hole-info.component.css']
})
export class HoleInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly GOAL_URL = '/api/course/hole/';
  goal: any;
  center: any;
  width!: number;
  destroyed$ = new Subject();

  @ViewChild('holeMap') holeMap!: google.maps.Map;


  hole$ = this.route.params
    .pipe(pluck("id"),
      switchMap(holeNumber => {
        return this.http.get<GoalWrapper>(this.GOAL_URL + holeNumber).pipe(pluck('hole'));
      }));

  first$ = this.hole$.pipe(pluck('bound'), map(bound => bound === 'first'));
  last$ = this.hole$.pipe(pluck('bound'), map(bound => bound === 'last'));

  markers$ = this.hole$.pipe(map(hole =>
    [
      { lat: hole.startLat, lng: hole.startLng },
      { lat: hole.endLat, lng: hole.endLng }
    ]
  ));

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }
  ngOnDestroy(): void {
    this.destroyed$.next({});
    this.destroyed$.complete();
  }

  ngAfterViewInit(): void {
    this.markers$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(markers => {
        if (this.holeMap) {
          const bounds = new google.maps.LatLngBounds();
          for (const marker of markers) {
            bounds.extend(marker);
          }
          this.holeMap.fitBounds(bounds, 100);
        }
      })
  }

  mapOptions = {
    disableDefaultUI: true,
    mapTypeId: 'satellite'
  }


  ngOnInit(): void {
    this.width = window.innerWidth;
    // TODO: get current location
    /*navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })*/
  }

}

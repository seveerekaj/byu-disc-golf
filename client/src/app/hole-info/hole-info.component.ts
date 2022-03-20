import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Goal, GoalWrapper } from '../goal';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

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
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  infoContent = ''


  hole$ = this.route.params
    .pipe(pluck("id"),
      switchMap(holeNumber => {
        return this.http.get<GoalWrapper>(this.GOAL_URL + holeNumber).pipe(pluck('hole'));
      }));

  first$ = this.hole$.pipe(pluck('bound'), map(bound => bound === 'first'));
  last$ = this.hole$.pipe(pluck('bound'), map(bound => bound === 'last'));

  markerSize = 60;

  markers$ = this.hole$.pipe(map(hole =>
    [
      {
        position: { lat: hole.startLat, lng: hole.startLng },
        icon: { url: 'assets/start-marker.svg', scaledSize: new google.maps.Size(this.markerSize, this.markerSize) },
        label: 'Start',
        info: 'Start at: ' + hole.startDescr
      },
      {
        position: { lat: hole.endLat, lng: hole.endLng },
        icon: { url: 'assets/goal-marker.svg', scaledSize: new google.maps.Size(this.markerSize, this.markerSize) },
        label: 'End',
        info: 'Finish at: ' + hole.endDescr
      }
    ]
  ));

  openInfoWindow(marker: MapMarker, content: string) {
    this.infoContent = content
    this.infoWindow.open(marker)
  }

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
            bounds.extend(marker.position);
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

  score!:number;
  submitScore(score: number) {
    this.hole$.pipe(
      pluck('holeId'),
      switchMap(holeId => this.http.post('/api/group/post-score', { holeId, playerId: 1, score }))
    ).subscribe();
  }

}

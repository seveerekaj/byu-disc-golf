import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Goal } from '../goal';

@Component({
  selector: 'app-hole-map',
  templateUrl: './hole-map.component.html',
  styleUrls: ['./hole-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoleMapComponent implements OnInit, OnChanges {
  @ViewChild('discMap') googleMap!: google.maps.Map;
  @Input() hole!: Goal;
  mapOptions!: google.maps.MapOptions;
  markers: google.maps.Marker[] = [];
  screenHeight!: number;
  screenWidth!:number;
  constructor() {
  }
  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const startMarker: google.maps.LatLngLiteral = { lat: this.hole.startLat, lng: this.hole.startLng };
    // const endMarker: google.maps.LatLngLiteral = { lat: this.hole.endLat, lng: this.hole.endLng };
    const startMarker = new google.maps.Marker({
      position: { lat: this.hole.startLat, lng: this.hole.startLng },
      label: 'Start'
    });
    const endMarker = new google.maps.Marker({
      position: { lat: this.hole.endLat, lng: this.hole.endLng },
      label: 'End'
    });


    this.markers.length = 0;
    this.markers.push(startMarker);
    this.markers.push(endMarker);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(startMarker.getPosition()!);
    bounds.extend(endMarker.getPosition()!);

    this.mapOptions = {
      center: bounds.getCenter(),
      zoom: 18,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }


    if (this.googleMap) {
      this.googleMap.fitBounds(bounds, 100);
    }
  }

}

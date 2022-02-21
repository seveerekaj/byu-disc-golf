import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hole-info',
  templateUrl: './hole-info.component.html',
  styleUrls: ['./hole-info.component.css']
})
export class HoleInfoComponent implements OnInit {

  holeNumber: any;
  hole = {
    "holeId": 1,
    "type": "Hole",
    "par": 3,
    "startDescr": "Top of stairs in grassy area within Heritage",
    "endDescr": "Pine tree near the sand volleyball court",
    "constraints": "example constraints",
    "startLat": 40.252769,
    "startLng": -111.645783,
    "endLat": 40.251537,
    "endLng": -111.64628
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.holeNumber = this.route.snapshot.paramMap.get('id');
    // TODO: query the backend for hole with this id
  }

}

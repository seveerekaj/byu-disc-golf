import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hole-info',
  templateUrl: './hole-info.component.html',
  styleUrls: ['./hole-info.component.css']
})
export class HoleInfoComponent implements OnInit {

  holeNumber: any;
  hole = {title: 'my hole'}

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.holeNumber = this.route.snapshot.paramMap.get('id');
    // TODO: query the backend for hole with this id
  }

}

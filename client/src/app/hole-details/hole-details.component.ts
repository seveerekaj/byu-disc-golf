import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hole-details',
  templateUrl: './hole-details.component.html',
  styleUrls: ['./hole-details.component.css']
})
export class HoleDetailsComponent implements OnInit {

  @Input() hole?: any

  constructor() { }

  ngOnInit(): void {
  }

}

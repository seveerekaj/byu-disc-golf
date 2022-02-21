import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holes',
  templateUrl: './holes.component.html',
  styleUrls: ['./holes.component.css']
})
export class HolesComponent implements OnInit {
  allHoles: any;

  constructor() { }

  ngOnInit(): void {
    //TODO: get all holes info from backend query rather than hard-coding it here
    this.allHoles = [
      {
          "holeId": 1,
          "type": "Hole",
          "par": 3,
          "startDescr": "Top of stairs in grassy area within Heritage",
          "endDescr": "Pine tree near the sand volleyball court",
          "startLat": 40.252769,
          "startLng": -111.645783,
          "endLat": 40.251537,
          "endLng": -111.64628
      },
      {
          "holeId": 2,
          "type": "Hole",
          "par": 3,
          "startDescr": "South-East corner of MOA parking lot",
          "endDescr": "Base of red/white arm at exit gate",
          "startLat": 40.250724,
          "startLng": -111.646469,
          "endLat": 40.251871,
          "endLng": -111.646905
      },
      {
          "holeId": 3,
          "type": "Hole",
          "par": 3,
          "startDescr": "East end of the pond",
          "endDescr": "Small tree at base of bell tower",
          "startLat": 40.252218,
          "startLng": -111.646702,
          "endLat": 40.252635,
          "endLng": -111.647531
      },
      {
          "holeId": 4,
          "type": "Hole",
          "par": 2,
          "startDescr": "Grass at base of bell tower",
          "endDescr": "North wall of the middle bell tower column",
          "startLat": 40.252644,
          "startLng": -111.647633,
          "endLat": 40.252855,
          "endLng": -111.647634
      },
      {
          "holeId": 5,
          "type": "Hole",
          "par": 4,
          "startDescr": "East end of Bean Museum parking lot",
          "endDescr": "Yellow column at corner of Marriott Center annex building",
          "startLat": 40.253988,
          "startLng": -111.646788,
          "endLat": 40.253709,
          "endLng": -111.648161
      },
      {
          "holeId": 6,
          "type": "Hole",
          "par": 3,
          "startDescr": "South-East Marriot Center exit doors",
          "endDescr": "Middle white column in balcony at South end of the tunnel",
          "startLat": 40.253598,
          "startLng": -111.648945,
          "endLat": 40.252683,
          "endLng": -111.649327
      },
      {
          "holeId": 7,
          "type": "Hole",
          "par": 3,
          "startDescr": "Balcony at South end of tunnel",
          "endDescr": "Water fountain at ASB",
          "constraints": "Only throw from the balcony when there are no cars or people below",
          "startLat": 40.252694,
          "startLng": -111.649349,
          "endLat": 40.25141,
          "endLng": -111.649306
      },
      {
          "holeId": 8,
          "type": "Hole",
          "par": 4,
          "startDescr": "Sidewalk near South-East corner of ASB East parking lot",
          "endDescr": "Base of flag pole between ASB and the library",
          "startLat": 40.251184,
          "startLng": -111.648561,
          "endLat": 40.250437,
          "endLng": -111.649426
      },
      {
          "holeId": 9,
          "type": "Hole",
          "par": 3,
          "startDescr": "Flagpole between ASB and the library",
          "endDescr": "Silver fire hydrant near North-West library exit doors",
          "startLat": 40.250434,
          "startLng": -111.649399,
          "endLat": 40.249148,
          "endLng": -111.649654
      },
      {
          "holeId": 10,
          "type": "Hole",
          "par": 2,
          "startDescr": "Concrete surrounding Chief Massasoit plaque",
          "endDescr": "Middle of East courtyard circle",
          "startLat": 40.248277,
          "startLng": -111.649867,
          "endLat": 40.248111,
          "endLng": -111.650458
      },
      {
          "holeId": 11,
          "type": "Hole",
          "par": 3,
          "startDescr": "East courtyard circle",
          "endDescr": "Large pole with phone box near ESC stairs",
          "startLat": 40.248111,
          "startLng": -111.650458,
          "endLat": 40.246982,
          "endLng": -111.650817
      },
      {
          "holeId": 12,
          "type": "Hole",
          "par": 4,
          "startDescr": "Top of ESC stairs",
          "endDescr": "Tree near Tree of Wisdom sculpture",
          "startLat": 40.24719,
          "startLng": -111.650489,
          "endLat": 40.246416,
          "endLng": -111.651959
      },
      {
          "holeId": 13,
          "type": "Hole",
          "par": 3,
          "startDescr": "Sidewalk at South-East corner of Brimhall building",
          "endDescr": "Base of Maeser statue",
          "startLat": 40.246074,
          "startLng": -111.652051,
          "endLat": 40.245478,
          "endLng": -111.653296
      },
      {
          "holeId": 14,
          "type": "Hole",
          "par": 6,
          "startDescr": "Speed limit sign on Campus Dr",
          "endDescr": "Concrete sign North of Benson building",
          "startLat": 40.245204,
          "startLng": -111.652892,
          "endLat": 40.246315,
          "endLng": -111.650847
      },
      {
          "holeId": 15,
          "type": "Hole",
          "par": 5,
          "startDescr": "Beginning of sidewalk between ESC and Benson",
          "endDescr": "Rock with anchor at East entrance of Clyde building",
          "constraints": "Disc must contact any part of the rock or its anchor",
          "startLat": 40.246757,
          "startLng": -111.650518,
          "endLat": 40.247083,
          "endLng": -111.648519
      },
      {
          "holeId": 16,
          "type": "Hole",
          "par": 3,
          "startDescr": "Sidewalk between MARB and Clyde building",
          "endDescr": "Blue sign next to stairs at South-West corner of Bookstore",
          "startLat": 40.24708,
          "startLng": -111.64871,
          "endLat": 40.247954,
          "endLng": -111.648549
      },
      {
          "holeId": 17,
          "type": "Hole",
          "par": 4,
          "startDescr": "Concrete between library and Bookstore",
          "endDescr": "South-West lamppost in field between HFAC and WILK",
          "startLat": 40.248102,
          "startLng": -111.6486,
          "endLat": 40.24922,
          "endLng": -111.647845
      },
      {
          "holeId": 18,
          "type": "Hole",
          "par": 5,
          "startDescr": "Grate at West end of field",
          "endDescr": "Garbage can to the right of center of Law building",
          "startLat": 40.24932,
          "startLng": -111.647822,
          "endLat": 40.249282,
          "endLng": -111.645455
      }
    ];
  }
}
export interface Goal {
  holeId: number;
  type: string;
  par: number;
  startDescr: string;
  endDescr: string;
  constraints: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number
}

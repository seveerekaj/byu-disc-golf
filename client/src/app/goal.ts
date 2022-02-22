export interface Goal {
  sortId: number;
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

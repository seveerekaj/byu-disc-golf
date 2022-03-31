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
  endLng: number;
  bound: 'first'|'last'|'none';
}

export interface GoalWrapper {
  hole: Goal;
  message: string;
}

export interface CourseWrapper {
  status: string;
  message: string;
  course: Goal[];
}

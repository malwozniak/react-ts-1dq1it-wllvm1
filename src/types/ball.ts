export interface Ball {
  x: number;
  y: number;
  radius: number;
  speed: number;
  directionX: number;
  directionY: number;
}

export interface Props {
  width: number;
  height: number;
}

export interface State {
  ball: Ball;
}


export class Step {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export class StepWithDirection extends Step {
	direction: Direction;

	constructor(x: number, y: number, direction: Direction) {
		super(x, y);
		this.direction = direction;
	}
}

export enum Direction {
	Norte,
	Sul,
	Leste,
	Oeste
}

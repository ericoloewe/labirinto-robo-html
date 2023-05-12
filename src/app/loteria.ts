import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Step } from "./step";
import rn from 'random-number';

export class Loteria implements IPlayer {
	name: string = "Loteria";
	initialX: number = 1;
	initialY: number = 1;
	maze: Maze;

	constructor(x: number, y: number, maze: Maze) {
		this.initialX = x;
		this.initialY = y;
		this.maze = maze;
	}

	generateSteps(maxSteps = 500): Step[] {
		let saiu = false, x = this.initialX, y = this.initialY;
		const steps = [new Step(x, y)];

		while (!saiu && steps.length < maxSteps) {
			let dx, dy, i = 0;

			do {
				let dir = this.getRandomInt(0, 3);
				dx = 0;
				dy = 0;
				switch (dir) {
					case 0: dx = 1;
						break;
					case 1: dx = -1;
						break;
					case 2: dy = 1;
						break;
					case 3: dy = -1;
						break;
				}
			}
			while (this.maze.isWall(x + dx, y + dy) && i++ < 4);

			if (this.maze.isPath(x + dx, y + dy)) {
				x += dx;
				y += dy;
			}

			steps.push(new Step(x, y));

			if (this.maze.isOut(x, y))
				saiu = true;
		}

		return steps;
	}

	private getRandomInt(min: number, max: number) {
		return rn({ min, max, integer: true })
	}
}

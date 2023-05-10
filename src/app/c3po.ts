import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Step } from "./step";

export class C3PO implements IPlayer {
	initialX: number = 1;
	initialY: number = 1;
	maze: Maze;
	sentido: string;

	constructor(x: number, y: number, maze: Maze) {
		this.initialX = x;
		this.initialY = y;
		this.maze = maze;
		this.sentido = 'L'
	}

	generateSteps(maxSteps = 500): Step[] {
		let cont = 1, saiu = false, x = this.initialX, y = this.initialY;
		const steps = [new Step(x, y)];
		let dx, dy;

		while (!saiu && cont < maxSteps) {
			dx = dy = 0;
			this.caminhar(x, y, dx, dy);
			x += dx;
			y += dy;
			steps.push(new Step(x, y));
			cont++;

			if (this.maze.isOut(x, y))
				saiu = true;
		}

		return steps;
	}

	private caminhar(x: number, y: number, dx: number, dy: number) {
		let ok = true;
		while (ok) {
			if (this.maze.isPath(x, y)) {
				switch (this.sentido) {
					case "N":
						dy = -1;
						break;
					case "S":
						dy = 1;
						break;
					case "L":
						dx = 1;
						break;
					case "O":
						dx = -1;
						break;
				}
				ok = false;
			} else {
				this.mudarSentido();
			}
		}
	}

	private mudarSentido() {
		let s = ["N", "L", "S", "O"];
		let i = s.indexOf(this.sentido);
		i = (i + 1) % 4;
		this.sentido = s[i];
	}
}

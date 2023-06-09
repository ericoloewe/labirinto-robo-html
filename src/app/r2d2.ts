import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Direction, Step, StepWithDirection } from "./step";

export class R2D2 implements IPlayer {
	name: string = "R2D2";
	initialX: number = 1;
	initialY: number = 1;
	maze: Maze;

	constructor(x: number, y: number, maze: Maze) {
		this.initialX = x;
		this.initialY = y;
		this.maze = maze;
	}

	generateSteps(maxSteps = 500): Step[] {
		const steps = [new StepWithDirection(this.initialX, this.initialY, Direction.EAST)];

		while (steps.length < maxSteps) {
			this.caminhar(steps, maxSteps);

			const lastStep = steps[steps.length - 1];

			if (this.maze.isOut(lastStep.x, lastStep.y))
				break;
		}

		return steps;
	}

	private caminhar(steps: StepWithDirection[], maxSteps: number) {
		let i = 0;
		let lastStep = steps[steps.length - 1];
		let { direction, x, y } = lastStep;
		let rotated = false;

		while (3 >= i++ || steps.length < maxSteps) { // loop criado para enquanto não for feito algo, o programa nao saia dessa função
			const nextStep = this.getNextStepFor(x, y, direction);
			const canWalk = this.maze.isPath(nextStep.x, nextStep.y) || this.maze.isOut(nextStep.x, nextStep.y);
			const hasHandsOnTheWall = this.isWallAtLeft(x, y, direction) || (rotated && this.isWallAtLeft(nextStep.x, nextStep.y, nextStep.direction));

			rotated = false;

			if (canWalk && hasHandsOnTheWall) { // verifica se não é parede a frente, e se ele esta com a mão a esquerda
				steps.push(nextStep);

				break;
			} else { //caso for uma parede a frente, ou ele nao estiver com a mao a frente ele faz os seguintes passos
				rotated = true;
				if (this.maze.isWall(nextStep.x, nextStep.y) && this.isWallAtLeft(x, y, direction) && !this.isWallAtRight(x, y, direction))
					direction = this.getRight(direction);
				else
					direction = this.getLeft(direction);

				steps.push(new StepWithDirection(x, y, direction));
			}
		}
	}

	private getLeft(direction: Direction) {
		let sent = Direction.EAST;

		switch (direction) { //verifica o sentido e retorna a direita do robo
			case Direction.NORTH:
				sent = Direction.WEST;
				break;
			case Direction.EAST:
				sent = Direction.NORTH;
				break;
			case Direction.WEST:
				sent = Direction.SOUTH;
				break;
			default:
				break;
		}
		return sent;
	}

	private getRight(direction: Direction) {
		let sent = Direction.EAST;

		switch (direction) { //verifica o sentido e retorna a direita do robo
			case Direction.EAST:
				sent = Direction.SOUTH;
				break;
			case Direction.SOUTH:
				sent = Direction.WEST;
				break;
			case Direction.WEST:
				sent = Direction.NORTH;
				break;
			default:
				break;
		}

		return sent;
	}

	private isWallAtLeft(x: number, y: number, direction: Direction) {
		let ret = false;

		switch (direction) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case Direction.NORTH:
				if (this.maze.isWall(x - 1, y)) ret = true;
				break;
			case Direction.EAST:
				if (this.maze.isWall(x, y - 1)) ret = true;
				break;
			case Direction.SOUTH:
				if (this.maze.isWall(x + 1, y)) ret = true;
				break;
			case Direction.WEST:
				if (this.maze.isWall(x, y + 1)) ret = true;
				break;
		}
		return ret;
	}

	private isWallAtRight(x: number, y: number, direction: Direction) {
		let ret = false;

		switch (direction) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case Direction.NORTH:
				if (this.maze.isWall(x + 1, y)) ret = true;
				break;
			case Direction.EAST:
				if (this.maze.isWall(x, y + 1)) ret = true;
				break;
			case Direction.SOUTH:
				if (this.maze.isWall(x - 1, y)) ret = true;
				break;
			case Direction.WEST:
				if (this.maze.isWall(x, y - 1)) ret = true;
				break;
		}
		return ret;
	}

	private getNextStepFor(x: number, y: number, direction: Direction) {
		let nextX = x, nextY = y;

		switch (direction) {
			case Direction.EAST:
				nextX++;
				break;
			case Direction.NORTH:
				nextY--;
				break;
			case Direction.WEST:
				nextX--;
				break;
			case Direction.SOUTH:
				nextY++;
				break;
		}

		return new StepWithDirection(nextX, nextY, direction);
	}
}
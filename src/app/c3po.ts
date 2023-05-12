import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Direction, Step, StepWithDirection } from "./step";

export class C3PO implements IPlayer {
	name: string = "C3PO";
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
		const steps = [new StepWithDirection(this.initialX, this.initialY, Direction.EAST)];

		while (steps.length < maxSteps) {
			this.walk(steps, maxSteps);
			const lastStep = steps[steps.length - 1];

			if (this.maze.isOut(lastStep.x, lastStep.y))
				break;
		}

		return steps;
	}

	private walk(steps: StepWithDirection[], maxSteps: number) {
		let i = 0;
		let lastStep = steps[steps.length - 1];
		let { direction, x, y } = lastStep;

		while (3 >= i++ && steps.length < maxSteps) { // loop criado para enquanto não for feito algo, o programa nao saia dessa função
			if (this.canWalk(x, y, direction)) {  // verifica se n�o � parede a frente
				steps.push(this.getNextStepFor(x, y, direction));

				break;
			} else { //caso for uma parede a frente, ou ele nao estiver com a mao a frente ele faz os seguintes passos
				if (!this.isWallAtRight(x, y, direction)) {
					direction = this.getRight(direction);
				} else {
					direction = this.getLeft(direction);
				}

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

	private isWallAtRight(x: number, y: number, direction: Direction) {
		let ret = false;

		switch (direction) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case Direction.SOUTH:
				if (this.maze.isWall(x - 1, y)) ret = true;
				break;
			case Direction.WEST:
				if (this.maze.isWall(x, y - 1)) ret = true;
				break;
			case Direction.NORTH:
				if (this.maze.isWall(x + 1, y)) ret = true;
				break;
			case Direction.EAST:
				if (this.maze.isWall(x, y + 1)) ret = true;
				break;
		}
		return ret;
	}

	private canWalk(x: number, y: number, direction: Direction) { //verifica o sentido e retorna se é possivel caminhar para o mesmo(que a frente nao ha parede)
		const nextStep = this.getNextStepFor(x, y, direction);

		return this.maze.isPath(nextStep.x, nextStep.y) || this.maze.isOut(nextStep.x, nextStep.y);
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

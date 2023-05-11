import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Direction, Step, StepWithDirection } from "./step";

export class R2D2 implements IPlayer {
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
		const steps = [new StepWithDirection(x, y, Direction.Leste)];

		while (!saiu && steps.length < maxSteps) {
			this.caminhar(steps, maxSteps);

			if (this.maze.isOut(x, y))
				saiu = true;
		}

		return steps;
	}

	private caminhar(steps: StepWithDirection[], maxSteps: number) {
		let i = 0;
		let directionY = 0, directionX = 0;
		let lastStep = steps[steps.length - 1];
		let { direction, x, y } = lastStep;

		while (3 >= i++ || steps.length > maxSteps) { // loop criado para enquanto não for feito algo, o programa nao saia dessa função
			if (this.tentarCaminhar(x, y, direction) && this.ehParedeEsq(x, y, direction)) { // verifica se não é parede a frente, e se ele esta com a mão a esquerda
				switch (direction) { //caso sim, ele anda para o sentido indicado
					case Direction.Norte:
						directionY = -1;
						break;
					case Direction.Sul:
						directionY = 1;
						break;
					case Direction.Leste:
						directionX = 1;
						break;
					case Direction.Oeste:
						directionX = -1;
						break;
				}

				x += directionX;
				y += directionY;
				steps.push(new StepWithDirection(x, y, direction));

				break;
			} else { //caso for uma parede a frente, ou ele nao estiver com a mao a frente ele faz os seguintes passos
				direction = this.getEsq(direction);
				steps.push(new StepWithDirection(x, y, direction));
			}
		}
	}

	private getEsq(direction: Direction) {
		let sent = Direction.Leste;

		switch (direction) { //verifica o sentido e retorna a direita do robo
			case Direction.Norte:
				sent = Direction.Oeste;
				break;
			case Direction.Leste:
				sent = Direction.Norte;
				break;
			case Direction.Oeste:
				sent = Direction.Sul;
				break;
			default:
				break;
		}
		return sent;
	}

	private getDir(direction: Direction) {
		let sent = Direction.Leste;

		switch (direction) { //verifica o sentido e retorna a direita do robo
			case Direction.Leste:
				sent = Direction.Sul;
				break;
			case Direction.Sul:
				sent = Direction.Oeste;
				break;
			case Direction.Oeste:
				sent = Direction.Norte;
				break;
			default:
				break;
		}

		return sent;
	}

	private ehParedeEsq(x: number, y: number, direction: Direction) {
		let ret = false;

		switch (direction) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case Direction.Norte:
				if (this.maze.isWall(x - 1, y)) ret = true;
				break;
			case Direction.Leste:
				if (this.maze.isWall(x, y - 1)) ret = true;
				break;
			case Direction.Sul:
				if (this.maze.isWall(x + 1, y)) ret = true;
				break;
			case Direction.Oeste:
				if (this.maze.isWall(x, y + 1)) ret = true;
				break;
		}
		return ret;
	}

	private tentarCaminhar(x: number, y: number, direction: Direction) { //verifica o sentido e retorna se é possivel caminhar para o mesmo(que a frente nao ha parede)
		let ret = false;
		if (this.maze.isPath(x + 1, y) && direction === Direction.Leste) ret = true;
		else if (this.maze.isPath(x, y - 1) && direction === Direction.Norte) ret = true;
		else if (this.maze.isPath(x, y + 1) && direction === Direction.Sul) ret = true;
		else if (this.maze.isPath(x - 1, y) && direction === Direction.Oeste) ret = true;
		return ret;
	}
}
import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Step } from "./step";

interface DXY {
	dx: number;
	dy: number;
}

export class R2D2 implements IPlayer {
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
		const dxy: DXY = { dx: 0, dy: 0 };

		debugger

		while (!saiu && cont < maxSteps) {
			dxy.dx = dxy.dy = 0;
			this.caminhar(x, y, dxy);
			x += dxy.dx;
			y += dxy.dy;
			steps.push(new Step(x, y));
			cont++;

			if (this.maze.isOut(x, y))
				saiu = true;
		}

		return steps;
	}

	private caminhar(x: number, y: number, dxy: DXY) {
		let ehParedeAFrenteDoSentido = true;
		let i = 0;

		while (ehParedeAFrenteDoSentido && 3 >= i++) { // loop criado para enquanto não for feito algo, o programa nao saia dessa função
			if (this.tentarCaminhar(x, y) && this.ehParedeEsq(x, y)) { // verifica se não é parede a frente, e se ele esta com a mão a esquerda
				switch (this.sentido) { //caso sim, ele anda para o sentido indicado
					case 'N':
						dxy.dy = -1;
						break;
					case 'S':
						dxy.dy = 1;
						break;
					case 'L':
						dxy.dx = 1;
						break;
					case 'O':
						dxy.dx = -1;
						break;
				}
				ehParedeAFrenteDoSentido = false; //ele seta o "ok" como false para ele sair do loop
			} else { //caso for uma parede a frente, ou ele nao estiver com a mao a frente ele faz os seguintes passos
				this.rotateRob(this.getEsq());
			}
		}
	}

	private getEsq() {
		let sent = ' ';
		switch (this.sentido) { //verifica o sentido e retorna a direita do robo
			case 'N':
				sent = 'O';
				break;
			case 'L':
				sent = 'N';
				break;
			case 'S':
				sent = 'L';
				break;
			case 'O':
				sent = 'S';
				break;
		}
		return sent;
	}

	private getDir() {
		let sent = ' ';
		switch (this.sentido) { //verifica o sentido e retorna a direita do robo
			case 'N':
				sent = 'L';
				break;
			case 'L':
				sent = 'S';
				break;
			case 'S':
				sent = 'O';
				break;
			case 'O':
				sent = 'N';
				break;
		}
		return sent;
	}

	private ehParedeEsq(x: number, y: number) {
		let ret = false;
		switch (this.sentido) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case 'N':
				if (this.maze.isWall(x - 1, y)) ret = true;
				break;
			case 'L':
				if (this.maze.isWall(x, y - 1)) ret = true;
				break;
			case 'S':
				if (this.maze.isWall(x + 1, y)) ret = true;
				break;
			case 'O':
				if (this.maze.isWall(x, y + 1)) ret = true;
				break;
		}
		return ret;
	}

	private tentarCaminhar(x: number, y: number) { //verifica o sentido e retorna se é possivel caminhar para o mesmo(que a frente nao ha parede)
		let ret = false;
		if (this.maze.isPath(x + 1, y) && this.sentido == 'L') ret = true;
		else if (this.maze.isPath(x, y - 1) && this.sentido == 'N') ret = true;
		else if (this.maze.isPath(x, y + 1) && this.sentido == 'S') ret = true;
		else if (this.maze.isPath(x - 1, y) && this.sentido == 'O') ret = true;
		return ret;
	}

	private rotateRob(sentido: string) {
		let s = ["N", "L", "S", "O"];

		for (let i = 0; i < 4; i++) //verifica o sentido recebido por parametro, se o mesmo � possivel ser setado no sentido da classe
			if (s[i] == sentido)
				this.sentido = sentido;
	}
}
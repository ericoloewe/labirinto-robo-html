import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Step } from "./step";

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
		let ok = true, okk = false;
		while (ok) { // loop criado para enquanto não for feito algo, o programa nao saia dessa função
			if (!this.maze.isWall(x, y) && (this.ehParedeEsq(x, y) || okk)) { // verifica se não é parede a frente, e se ele esta com a mão a esquerda
				switch (this.sentido) { //caso sim, ele anda para o sentido indicado
					case 'N':
						dy = -1;
						break;
					case 'S':
						dy = 1;
						break;
					case 'L':
						dx = 1;
						break;
					case 'O':
						dx = -1;
						break;
				}
				ok = false; //ele seta o "ok" como false para ele sair do loop
			} else { //caso for uma parede a frente, ou ele nao estiver com a mao a frente ele faz os seguintes passos
				if (this.ehParedeEsq(x, y)) { //verifica se é parede na esquerda
					while (this.maze.isWall(x, y)) { //caso sim verifica se é parede a frente
						if (!this.ehParedeEsq(x, y)) { //se nao for parede a esquerda ele rotaciona o robo a esquerda
							this.rotateRob(this.getEsq());
						} else { //caso for parede a esquerda ele rotaciona o robo a direita
							this.rotateRob(this.getDir());
						}
					}
				} else { //caso nao for parede a frente ele rotaciona o robo a esquerda, para continuar com a devida mao a parede
					this.rotateRob(this.getEsq());
					okk = true;
				}
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
		let ret = true;
		switch (this.sentido) { //verifica o sentido e retorna se for parede na esquerda ou nao
			case 'N':
				if (this.maze.isPath(x - 1, y)) ret = false;
				break;
			case 'L':
				if (this.maze.isPath(x, y - 1)) ret = false;
				break;
			case 'S':
				if (this.maze.isPath(x + 1, y)) ret = false;
				break;
			case 'O':
				if (this.maze.isPath(x, y + 1)) ret = false;
				break;
		}
		return ret;
	}

	private ehParedeDir(x: number, y: number) {
		let ret = true;
		switch (this.sentido) { //verifica o sentido e retorna se for parede na direita ou nao
			case 'N':
				if (this.maze.isPath(x + 1, y)) ret = false;
				break;
			case 'L':
				if (this.maze.isPath(x, y + 1)) ret = false;
				break;
			case 'S':
				if (this.maze.isPath(x - 1, y)) ret = false;
				break;
			case 'O':
				if (this.maze.isPath(x, y - 1)) ret = false;
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
			if (s[i] == sentido) sentido = sentido;
	}
}
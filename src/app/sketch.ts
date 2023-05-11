// import P5 from 'p5';

import { Maze } from './maze';
import { P5Drawer } from './p5-drawer';
import labirintos from './labirintos'
import { Loteria } from './loteria';
import { IPlayer } from './interfaces';
import { C3PO } from './c3po';
import { R2D2 } from './r2d2';
import { Walle } from './walle';
import { Direction, StepWithDirection } from './step';

export type P5Type = import('p5');
export type P5Image = import('p5').Image;

export interface Options {
	waitTime: number
}

export async function createMaze(mazePath: string, options: Options) {
	const { default: P5 } = await import("p5");
	clearCanvasHtml();

	const mazeFile = labirintos[mazePath] as string;

	if (mazeFile == null)
		throw new Error('Labirinto invalido');

	const player = createMazeFromFile(mazeFile);
	const drawer = new P5Drawer(null as any, player);

	// Creating the sketch itself
	const sketch = (p5: P5Type) => {
		drawer.canvas = p5;

		p5.preload = () => drawer.preload();

		// The sketch setup method 
		p5.setup = () => {
			const { maze } = player;
			// Creating and positioning the canvas
			drawer.prepare(maze.width, maze.height);
			drawer.drawMaze();
		};

		let time = Date.now();

		// The sketch draw method
		p5.draw = () => {
			if ((Date.now() - time) > options.waitTime) {
				executeAction(drawer);
				time = Date.now();
			}
		};

	};

	new P5(sketch);

	return drawer;
}

function executeAction(drawer: P5Drawer) {
	if (drawer.steps != null) {
		const lastStep = drawer.steps[drawer.current - 1]
		const currentStep = drawer.steps[drawer.current++];
		let direction = Direction.Leste;

		if (currentStep == null) {
			// alert('saiu');
			return;
		}

		if (lastStep != null)
			drawer.restore(lastStep.x, lastStep.y);

		if (currentStep instanceof StepWithDirection)
			direction = currentStep.direction;

		drawer.drawPlayer(currentStep.x, currentStep.y, direction);
	}
}

function clearCanvasHtml() {
	const section = document.getElementById('canvasSection');

	if (section != null)
		section.innerHTML = '';
}

function createMazeFromFile(mazeFile: string): IPlayer {
	const lines = mazeFile.split('\n');

	const dimensao = lines[0].split(' ');

	const heigth = Number(dimensao[1]);
	const width = Number(dimensao[2]);

	const posicao = lines[1].split(' ');

	const y = Number(posicao[1]);
	const x = Number(posicao[2]);

	const playerIndex = Number(lines[2].split(' ')[1]);

	const grid = [] as number[][];

	for (let i = 0; i < heigth; i++) {
		const line = lines[i + 3].split('');

		grid[i] = [];

		for (let j = 0; j < width; j++) {
			grid[i][j] = line[j] === '*' ? 1 : 0;
		}
	}

	const maze = new Maze(grid);
	let player: IPlayer;

	switch (playerIndex) { //verifica o robo atual, e seta ele como o robo do programa
		case 1: {
			player = new C3PO(x, y, maze);
			break;
		}
		case 2: {
			player = new R2D2(x, y, maze);
			break;
		}
		case 3: {
			player = new Walle(x, y, maze);
			break;
		}
		default: {
			player = new Loteria(x, y, maze)
			break;
		}
	}

	return player;
}



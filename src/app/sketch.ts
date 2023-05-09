// import P5 from 'p5';

import { Maze } from './maze';
import { P5Drawer } from './p5-drawer';
import labirintos from './labirintos'
import { Loteria } from './loteria';

export type P5Type = import('p5');
export type P5Image = import('p5').Image;

export async function createMaze(mazePath: string) {
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

			for (let i = 0; i < maze.grid.length; i++) {
				for (let j = 0; j < maze.grid[i].length; j++) {
					if (maze.grid[i][j] === 1) {
						drawer.drawBrick(j, i);
					} else {
						drawer.drawSand(j, i);
					}
				}
			}
		};

		let time = Date.now();
		const waitTime = 500;

		// The sketch draw method
		p5.draw = () => {
			if ((Date.now() - time) > waitTime) {
				executeAction();
				time = Date.now();
			}
		};

		function executeAction() {
			if (drawer.steps != null) {
				const lastStep = drawer.steps[drawer.current - 1]
				const currentStep = drawer.steps[drawer.current++];

				drawer.drawPlayer(currentStep.x, currentStep.y);

				if (lastStep != null)
					drawer.restore(lastStep.x, lastStep.y);


				if (currentStep == null)
					alert('saiu');
			}
		}
	};

	new P5(sketch);

	return drawer;
}

function clearCanvasHtml() {
	const section = document.getElementById('canvasSection');

	if (section != null)
		section.innerHTML = '';
}

function createMazeFromFile(mazeFile: string) {
	const lines = mazeFile.split('\n');

	const dimensao = lines[0].split(' ');

	const heigth = Number(dimensao[1]);
	const width = Number(dimensao[2]);

	const posicao = lines[1].split(' ');

	const y = Number(posicao[1]);
	const x = Number(posicao[2]);

	const grid = [] as number[][];

	for (let i = 0; i < heigth; i++) {
		const line = lines[i + 3].split('');

		grid[i] = [];

		for (let j = 0; j < width; j++) {
			grid[i][j] = line[j] === '*' ? 1 : 0;
		}
	}

	return new Loteria(x, y, new Maze(grid));
}



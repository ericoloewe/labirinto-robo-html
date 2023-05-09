// import P5 from 'p5';

import labirintos from './labirintos'

export async function createMaze(mazePath: string) {
	const { default: P5 } = await import("p5");

	console.log(P5);

	type P5Type = import('p5');
	type P5Image = import('p5').Image;



	const section = document.getElementById('canvasSection');

	if (section != null)
		section.innerHTML = '';

	const mazeFile = labirintos[mazePath] as string;

	if (mazeFile == null)
		throw new Error('Labirinto invalido');

	const maze = createMazeOfFile(mazeFile);
	const tileSize = 20;
	const images = {} as { brick: P5Image, sand: P5Image };

	// Creating the sketch itself
	const sketch = (p5: P5Type) => {
		p5.preload = () => {
			images.brick = p5.loadImage('brick.jpg');
			images.sand = p5.loadImage('sand.jpg');
		}

		// The sketch setup method 
		p5.setup = () => {			
			// Creating and positioning the canvas
			const canvas = p5.createCanvas(maze.width * tileSize, maze.height * tileSize);
			canvas.parent("canvasSection");

			// Configuring the canvas
			p5.background("white");

			p5.stroke(0);
			p5.strokeWeight(1);

			for (let i = 0; i < maze.grid.length; i++) {
				for (let j = 0; j < maze.grid[i].length; j++) {
					if (maze.grid[i][j] === 1) {
						p5.image(images.brick, j * tileSize, i * tileSize, tileSize, tileSize);
					} else {
						p5.image(images.sand, j * tileSize, i * tileSize, tileSize, tileSize);
					}
				}
			}

			// DEMO: Create three circles in the center of the canvas
			console.log(labirintos);
		};

		// The sketch draw method
		p5.draw = () => {

		};
	};

	new P5(sketch);
}

function createMazeOfFile(mazeFile: string) {
	var lines = mazeFile.split('\n');

	var dimensao = lines[0].split(' ');

	var heigth = Number(dimensao[1]);
	var width = Number(dimensao[2]);

	var posicao = lines[1].split(' ');

	var y = posicao[1];
	var x = posicao[2];

	var grid = [] as number[][];

	for (let i = 0; i < heigth; i++) {
		var line = lines[i + 3].split('');

		grid[i] = [];

		for (let j = 0; j < width; j++) {
			grid[i][j] = line[j] === '*' ? 1 : 0;
		}
	}

	return new Maze(grid);
}

class Maze {
	grid: number[][];
	height: number;
	width: number;

	constructor(grid: number[][]) {
		this.grid = grid;
		this.height = grid.length;
		this.width = grid[0].length;
	}

}
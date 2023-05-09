import { IPlayer } from './interfaces';
import { P5Type, P5Image } from './sketch';
import { Step } from './step';

export class P5Drawer {
	canvas: P5Type;
	tileSize = 20;
	images = {} as { brick: P5Image; sand: P5Image;[key: string]: P5Image; };
	player: IPlayer;
	steps?: Step[];
	current: number = 0;

	constructor(p5: P5Type, player: IPlayer) {
		this.canvas = p5;
		this.player = player;
	}

	public preload() {
		this.images.brick = this.canvas.loadImage('brick.jpg');
		this.images.sand = this.canvas.loadImage('sand.jpg');
		this.images.loteria = this.canvas.loadImage('b9.jpg');
		this.images.c3po = this.canvas.loadImage('c3po.jpg');
		this.images.r2d2 = this.canvas.loadImage('r2d2.jpg');
		this.images.walle = this.canvas.loadImage('walle.jpg');
	}

	public prepare(width: number, height: number) {
		const canvasHtml = this.canvas.createCanvas(width * this.tileSize, height * this.tileSize);

		canvasHtml.parent("canvasSection");
	}

	public drawMaze() {
		for (let i = 0; i < this.player.maze.grid.length; i++) {
			for (let j = 0; j < this.player.maze.grid[i].length; j++) {
				if (this.player.maze.grid[i][j] === 1) {
					this.drawBrick(j, i);
				} else {
					this.drawSand(j, i);
				}
			}
		}
	}

	public drawBrick(x: number, y: number) {
		this.canvas.image(this.images.brick, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

	public drawSand(x: number, y: number) {
		this.canvas.image(this.images.sand, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

	public drawPlayer(x: number, y: number) {
		const player = this.player.constructor.name.toLowerCase();

		this.canvas.image(this.images[player], x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

	public restore(x: number, y: number) {
		if (this.player.maze.isPath(x, y)) {
			this.drawSand(x, y);
		} else {
			this.drawBrick(x, y);
		}
	}

	public generateStepsAndDraw() {
		this.steps = this.player.generateSteps();
	}
}

import { IPlayer } from './interfaces';
import { P5Type, P5Image } from './sketch';
import { Direction, Step } from './step';

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
		this.images.brick = this.loadImage('brick.jpg');
		this.images.sand = this.loadImage('sand.jpg');
		this.images.loteria = this.loadImage('b9.jpg');
		this.images.c3po = this.loadImage('C3PO.jpg');
		this.images.r2d2 = this.loadImage('R2D2.jpg');
		this.images.walle = this.loadImage('walle.jpg');
	}

	private loadImage(src: string) {
		return this.canvas.loadImage(`${process.env.BASE_PATH}/${src}`);
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

	public drawPlayer(x: number, y: number, direction: Direction) {
		const player = this.player.name.toLowerCase();
		const realX = x * this.tileSize;
		const realY = y * this.tileSize;

		this.canvas.push();

		//note that this will rotate shapes around the ORIGIN
		//this is why we translated the origin to the center
		this.canvas.translate(realX + this.tileSize / 2, realY + this.tileSize / 2);
		this.canvas.angleMode(this.canvas.DEGREES);
		this.canvas.rotate(this.getAngleForPlayerDirection(direction));

		this.canvas.imageMode(this.canvas.CENTER);
		this.canvas.image(this.images[player], 0, 0, this.tileSize, this.tileSize);
		this.canvas.pop();
	}

	private getAngleForPlayerDirection(direction: Direction): number {
		let angle = 0;

		switch (direction) {
			case Direction.NORTH:
				angle = 270;
				break;
			case Direction.SOUTH:
				angle = 90;
				break;
			case Direction.WEST:
				angle = 180;
				break;
			default:
				break;
		}

		return angle;
	}

	public restore(x: number, y: number) {
		if (this.player.maze.isPath(x, y)) {
			this.drawSand(x, y);
		} else {
			this.drawBrick(x, y);
		}
	}

	public generateStepsAndDraw(maxSteps: number = 500) {
		this.steps = this.player.generateSteps(maxSteps);
	}

	public stopAndRemove() {
		this.canvas.remove();
	}
}

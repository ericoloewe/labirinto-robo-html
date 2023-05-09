
export class Maze {
	grid: number[][];
	height: number;
	width: number;

	constructor(grid: number[][]) {
		this.grid = grid;
		this.height = grid.length;
		this.width = grid[0].length;
	}

	public isOut(x: number, y: number) {
		return x < 0 || y < 0 || x >= this.width || y >= this.height;
	}

	public isWall(x: number, y: number) {
		return !this.isOut(x, y) && this.grid[y][x] == 1;
	}

	public isPath(x: number, y: number) {
		return !this.isOut(x, y) && this.grid[y][x] == 0;
	}
}

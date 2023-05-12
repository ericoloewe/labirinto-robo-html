import { Maze } from './maze';
import { IPlayer } from "./interfaces";
import { Step } from "./step";
import { PathNode, Tree } from './tree';

export class Walle implements IPlayer {
	name: string = "Walle";
	initialX: number = 1;
	initialY: number = 1;
	maze: Maze;
	arv: Tree<PathNode<Step>>;
	steps: Step[];
	way: Step[];
	tree: Step[];
	fim = 0;

	constructor(x: number, y: number, maze: Maze) {
		this.initialX = x;
		this.initialY = y;
		this.maze = maze;
		this.arv = new Tree();
		this.steps = []
		this.way = []
		this.tree = [];
	}

	generateSteps(): Step[] {
		const x = this.initialX;
		const y = this.initialY;

		this.steps = [new Step(x, y)];
		this.geraArvore(x, y);
		this.caminhar();

		return this.steps;
	}

	caminhar() {
		this.caminharNodo(this.arv.raiz as any);

		this.way.forEach(w => {
			this.steps.push(w);
		});

		let i = this.arv.tamanho();
	}

	caminharNodo(no?: PathNode<Step>) {
		let x, y;

		if (no != null) {
			x = no.info.x;
			y = no.info.y;

			if (this.maze.isOut(x, y)) {
				this.fim++;
				const steps = [];

				while (no != null) {
					steps.unshift(no.info);
					no = no.pai!;
				}

				if (steps.length < this.way.length || this.fim == 1) {
					this.way = steps;
				}
			} else {
				this.caminharNodo(no.cima);
				this.caminharNodo(no.baixo);
				this.caminharNodo(no.esq);
				this.caminharNodo(no.dir);
			}
		}
	}

	private geraArvore(x: number, y: number) {
		const no = new PathNode<Step>(new Step(x, y));

		if (this.maze.isPath(x, y - 1)) this.geraArvoreNodo(x, y - 1, 'cima', no);
		if (this.maze.isPath(x, y + 1)) this.geraArvoreNodo(x, y + 1, 'baixo', no);
		if (this.maze.isPath(x - 1, y)) this.geraArvoreNodo(x - 1, y, 'esq', no);
		if (this.maze.isPath(x + 1, y)) this.geraArvoreNodo(x + 1, y, 'dir', no);

		this.arv.raiz = no as any;
	}

	private geraArvoreNodo(x: number, y: number, tipoNo: string, parent: PathNode<Step>) {
		const parentObj = parent as { [key: string]: any }
		const no = parentObj[tipoNo] = parentObj[tipoNo] || new PathNode<Step>(new Step(x, y));

		no.info.x = x;
		no.info.y = y;
		no.pai = parent;

		this.tree.push(no.info)

		if (this.maze.isOut(x, y))
			return

		if ((this.maze.isPath(x, y - 1) || this.maze.isOut(x, y - 1)) && (!this.ehPontoAnt(x, y - 1) || parent == this.arv.raiz as any)) this.geraArvoreNodo(x, y - 1, 'cima', no);
		if ((this.maze.isPath(x, y + 1) || this.maze.isOut(x, y + 1)) && (!this.ehPontoAnt(x, y + 1) || parent == this.arv.raiz as any)) this.geraArvoreNodo(x, y + 1, 'baixo', no);
		if ((this.maze.isPath(x - 1, y) || this.maze.isOut(x - 1, y)) && (!this.ehPontoAnt(x - 1, y) || parent == this.arv.raiz as any)) this.geraArvoreNodo(x - 1, y, 'esq', no);
		if ((this.maze.isPath(x + 1, y) || this.maze.isOut(x + 1, y)) && (!this.ehPontoAnt(x + 1, y) || parent == this.arv.raiz as any)) this.geraArvoreNodo(x + 1, y, 'dir', no);
	}

	private ehPontoAnt(x: number, y: number) {
		let ret = false;

		for (const step of this.tree) //faz uma varredura na lista que � gerada enquanto geramos a arvore
		{
			if (step.x == x && step.y == y) ret = true; //verifica se a posi��o x e y s�o igual
		}

		return ret;
	}
}

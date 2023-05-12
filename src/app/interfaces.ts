import { Maze } from './maze';
import { Step } from './step';


export interface IPlayer {
	name: string;
	maze: Maze;
	generateSteps(maxSteps?: number): Step[];
}

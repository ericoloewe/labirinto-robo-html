import { Maze } from './maze';
import { Step } from './step';


export interface IPlayer {
	maze: Maze;
	generateSteps(maxSteps?: number): Step[];
}

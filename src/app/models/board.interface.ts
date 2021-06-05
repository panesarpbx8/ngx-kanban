import { Task } from './task.interface';

export interface Board {
	priority?: number;
	title: string;
	uid: string;
	id?: string;
	tasks: Task[];
}
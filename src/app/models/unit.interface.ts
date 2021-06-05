import { Task } from './task.interface';

export interface Unit {
	todos: Task[];
	ongoing: Task[];
	done: Task[];
	id: string;
	uid: string;
}
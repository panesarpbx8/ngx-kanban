export interface Task {
	id?: string;
	label: 'red' | 'skyblue' | 'yellow' | 'teal' | 'purple';
	content: string;
	isDone: boolean;
}
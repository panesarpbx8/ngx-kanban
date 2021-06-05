export interface Task {
	id?: string;
	label: 'red' | 'skyblue' | 'yellow' | 'teal' | 'purple' | 'done';
	content: string;
}
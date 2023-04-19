type info = 'info' | 'warning' | 'error' | 'success';

export type notification = {
	type: info;
	title: string;
	message: string;
};
export type todo = {
	name: string;
	description: string;
	todo_uid?:string;
	user_uid?:string;
	created?: string;
	updated?: string;
	delted?: string;
	icon?: string;
};

export type todos = todo[];
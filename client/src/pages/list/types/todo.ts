export type todo = {
	name: string;
	description: string;
	todo_uid?:string;
	user_uid?:string;
	created?: string;
	updated?: string;
	deleted?: string;
	icon?: string;
};

export type todos = todo[];
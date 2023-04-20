import { computed } from 'vue';
import { defineStore } from 'pinia';
import { User } from '../types/user';
import { todo, todos } from '../types/todo';

type themeOption = 'light' | 'dark';
type langOption = 'cs' | 'en';
type storageOption = 'localStorage' | 'db';
type currentUser = User | null;

export const usePreferenceStore = defineStore('preferences', () => {
	// ===== USER TYPE =====
	let user:currentUser = null;

	const currentStorageType = computed(() => storageType);

	const login = (logged_user:User) => {
		user = logged_user;
		storageType = 'db';
	};

	const currentUser = computed(() => user);

	// ===== STORAGE TYPE =====
	let storageType:storageOption = 'localStorage';
	
	// ===== USER COLOUR THEME =====
	let theme:themeOption = 'light';

	const currentTheme = computed(() => theme);

	const switchTheme = (newTheme:themeOption) => {
		theme = newTheme;
	};

	const getTheme = () => {
		return theme;
	};
	
	// ===== USER SELECTED LANGUAGE =====
	let lang:langOption = 'en';

	const currentLang = computed(() => lang);

	const switchLang = (newLang:langOption) => {
		lang = newLang;
	};

	const getLang = () => {
		return lang;
	};

	// ===== TODOS =====
	let todos:todos = [];

	const currentTodos = computed(() => todos);

	const updateTodo = (updatedTodo:todo):void => {
		let selectedTodo = todos.find((todo) => (
			todo.todo_uid === updatedTodo.todo_uid
		));
		selectedTodo = updatedTodo;
	};

	const insertTodo = (newTodo:todo) => {
		todos.push(newTodo);
	};

	const setTodos = (setTodos:todos) => {
		todos = setTodos;
	};

	const getTodo = (uid:string) => {
		return todos.find((todo) => (todo.todo_uid === uid));
	};

	return {
		login,
		currentUser,
		currentStorageType,
		switchTheme,
		getTheme,
		currentTheme,
		switchLang,
		getLang,
		currentLang,
		currentTodos,
		setTodos,
		updateTodo,
		insertTodo,
		getTodo,
	};
});
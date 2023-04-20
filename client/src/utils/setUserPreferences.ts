// import { useI18n } from 'vue-i18n';

import { usePreferenceStore } from '../stores/preferences';
import { setTheme } from './theme';
import { User } from '../types/user';
import { todos } from '../types/todo';

export const setUserPreference = ():void => {
	const preferenceStore = usePreferenceStore();
	const authedUser:User|null = preferenceStore.currentUser;

	if (!authedUser) {
		const selectedLanguage:string|null = localStorage.getItem('language');
		const selectedTheme:string|null = localStorage.getItem('theme');
		setTheme(selectedTheme || 'light');

		const savedTodos:todos = JSON.parse(
			JSON.stringify(localStorage.getItem('list-app-todos'))
		);
		if (savedTodos && savedTodos.length) {
			preferenceStore.setTodos(savedTodos);
		}

	} else if (authedUser) {
		setTheme(authedUser.theme || 'light');
	}
};

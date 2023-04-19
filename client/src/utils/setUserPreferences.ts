// import { useI18n } from 'vue-i18n';

import { usePreferenceStore } from '../stores/preferences';
import { setTheme } from './theme';
import { User } from '../types/user';

export const setUserPreference = ():void => {
	const preferenceStore = usePreferenceStore();
	const authedUser:User|null = preferenceStore.currentUser;

	if (!authedUser) {
		const selectedLanguage:string|null = localStorage.getItem('language');
		if (selectedLanguage) {
			preferenceStore.setUserLang(selectedLanguage);
		}
		const selectedTheme:string|null = localStorage.getItem('theme');
		if (selectedTheme) {
			preferenceStore.setUserTheme(selectedTheme);
		}

		setTheme(selectedTheme || 'light');

	} else if (authedUser) {
		if (authedUser.lang) {
			preferenceStore.setUserLang(authedUser.lang);
		}
		if (authedUser.theme) {
			preferenceStore.setUserTheme(authedUser.theme);
		}

		setTheme(authedUser.theme || 'light');
	}
};

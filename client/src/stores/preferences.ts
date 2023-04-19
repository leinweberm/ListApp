import { computed } from 'vue';
import { defineStore } from 'pinia';
import { User } from '../pages/user/types/user';

type themeOption = 'light' | 'dark';
type langOption = 'cs' | 'en';
type storageOption = 'localStorage' | 'db';
type currentUser = User | null;

export const usePreferenceStore = defineStore('preferences', () => {
	// USER TYPE
	let user:currentUser = null;
	const login = (logged_user:User) => {
		user = logged_user;
		storageType = 'db';
	};
	const currentUser = computed(() => user);

	// STORAGE TYPE
	let storageType:storageOption = 'localStorage';
	const currentStorageType = computed(() => storageType);
	
	// USER COLOUR THEME
	let theme:themeOption = 'light';
	const switchTheme = () => {
		theme = (theme === 'light') ? 'dark' : 'light';
	};
	const setUserTheme = (newTheme:string) => {
		if (newTheme === 'dark' || newTheme === 'light') {
			theme = newTheme;
		}
	};
	const currentTheme = computed(() => theme);
	
	// USER SELECTED LANGUAGE
	let lang:langOption = 'en';
	const switchLang = () => {
		lang = (lang === 'en') ? 'cs' : 'en';
	};
	const setUserLang = (newLang:string) => {
		if (newLang === 'cs' || newLang === 'en') {
			lang = newLang;
		}
	};
	const currentLang = computed(() => lang);

	return {
		login,
		currentUser,
		currentStorageType,
		switchTheme,
		setUserTheme,
		currentTheme,
		switchLang,
		setUserLang,
		currentLang
	};
});
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePreferenceStore } from '../../stores/preferences';
import { setTheme } from '../../utils/theme';
import { User } from './types/user';
import { InputOption } from '../../types/inputOption';

export default defineComponent({
	setup() {
		const route = useRoute();
		const router = useRouter();
		const preferenceStore = usePreferenceStore();
		const authedUser = ref<User|null>(null);
		const langOptions:InputOption = [
			{ value: 'en', label: 'English' },
			{ value: 'cs', label: 'Czech' },
		];
		const themeOptions:InputOption = [
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' },
		];

		onMounted(() => {
			console.log('route params', route.params);
			console.log('currentUser', preferenceStore.currentUser);

			authedUser.value = preferenceStore.currentUser;
			if (!authedUser.value) {
				const selectedLanguage:string|null = localStorage.getItem('language');
				if (selectedLanguage) {
					preferenceStore.setUserLang(selectedLanguage);
				}
				const selectedTheme:string|null = localStorage.getItem('theme');
				if (selectedTheme) {
					preferenceStore.setUserTheme(selectedTheme);
				}
			} else if (authedUser.value) {
				if (authedUser.value.lang) {
					preferenceStore.setUserLang(authedUser.value.lang);
				}
				if (authedUser.value.theme) {
					preferenceStore.setUserTheme(authedUser.value.theme);
				}
			}
			console.log('current theme', preferenceStore.currentTheme);
			console.log('current lang', preferenceStore.currentLang);
		});

		const handleSwitchSettings = (type:string) => {
			console.log('type', type);
			switch(type) {
				case 'theme':
					preferenceStore.switchTheme();
					setTheme(preferenceStore.currentTheme);
					console.log('current theme', preferenceStore.currentTheme);
					break;
				case 'lang':
					preferenceStore.switchLang();
					console.log('current lang', preferenceStore.currentLang);
					break;
				default:
					console.warn('Invalid action type');
					break;
			};
		};

		const prepareSelectedOption = (type:string):number => {
			switch(type) {
				case 'theme':
					const selectedTheme:number = themeOptions.findIndex(
						(item) => (item.value === preferenceStore.currentTheme)
					);
					return selectedTheme;
				case 'lang':
					const selectedLang:number = langOptions.findIndex(
						(item) => (item.value === preferenceStore.currentLang)
					);
					return selectedLang;
				default:
					return 0;
			}
		};

		return {
			authedUser,
			preferenceStore,
			langOptions,
			themeOptions,
			handleSwitchSettings,
			prepareSelectedOption,
		};
	},
});
</script>

<template>
	<div id="userPage" class="pageBody">
		<div class="pageInnerBody">

			<input-switch
				id="user-selected-language"
				:attribute="langOptions"
				@input-switch-changed="handleSwitchSettings('lang')"
			/>

			<input-switch
				id="user-selected-theme"
				:attribute="themeOptions"
				@input-switch-changed="handleSwitchSettings('theme')"
			/>

		</div>
	</div>
</template>

<style scoped>
.pageInnerBody {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	max-width: 800px;
	border: 1px solid red;
	margin: auto;
	align-items: center;
}
</style>
<script lang="ts">
import { defineComponent, onMounted, onActivated, ref } from 'vue';

import { usePreferenceStore } from '../../stores/preferences';
import { setTheme } from '../../utils/theme';
import { InputOption } from '../../types/inputOption';

export default defineComponent({
	setup() {
		const preferenceStore = usePreferenceStore();
		const langOptions:InputOption = [
			{ value: 'en', label: 'English' },
			{ value: 'cs', label: 'Czech' },
		];
		const themeOptions:InputOption = [
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' },
		];
		const selectedLang = ref<string>();
		const selectedTheme = ref<string>();
		type themeOption = 'light' | 'dark';
		type langOption = 'cs' | 'en';

		onMounted(() => {
			fetch();
		});

		onActivated(() => {
			fetch();
		})

		const fetch = () => {
			selectedLang.value = preferenceStore.currentLang;
			selectedTheme.value = preferenceStore.currentTheme;
		};

		const handleSwitchTheme = (theme:themeOption) => {
			// console.log('theme', theme);
			preferenceStore.switchTheme(theme);
			// console.log('current theme:', preferenceStore.getTheme);
			setTheme(theme);
		};

		const handleSwitchLanguage = (lang:langOption) => {
			// console.log('lang', lang);
			preferenceStore.switchLang(lang);
			// console.log('current lang:', preferenceStore.getLang);
		};

		return {
			preferenceStore,
			langOptions,
			themeOptions,
			handleSwitchTheme,
			handleSwitchLanguage,
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
				@input-switch-changed="handleSwitchLanguage"
			/>

			<input-switch
				id="user-selected-theme"
				:attribute="themeOptions"
				@input-switch-changed="handleSwitchTheme"
			/>

		</div>
	</div>
</template>

<style scoped>
</style>
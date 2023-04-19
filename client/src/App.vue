<script lang="ts">
import { reactive, defineComponent, onMounted, ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

import { User } from './types/user';
import { notification } from './types/notification';
import { usePreferenceStore } from './stores/preferences';
import { setUserPreference } from './utils/setUserPreferences';

export default defineComponent({
	setup() {
		const { t } = useI18n({ useScope: 'global' });
		const authedUser = ref<User|null>(null);
		const preferenceStore = usePreferenceStore();
		const notification:notification = reactive({
			type: 'info',
			title: '',
			message: '',
		});
		
		onMounted(() => {
			authedUser.value = preferenceStore.currentUser;
			setUserPreference();
			nextTick();
		});

		return {
			notification,
			t,
		};
	},
});
</script>

<template>
	<div class="appBody">
		<ml-menu />
		<RouterView />
	</div>
</template>

<style>
.appBody {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 70px auto;
	grid-template-areas:
		"menu"
		"body";
	width: 100%;
	height: 100dvh;
	background-color: var(--secondary-background);
	padding-top: var(--menuSize);
}
.success, .warning, .error {
	border-radius: 4px;
	padding: 6px 12px;
	letter-spacing: 0.08rem;
	padding-bottom: 8px;
}
.success {
	background-color: var(--success);
}
.warning {
	background-color: var(--warning);
}
.error {
	background-color: var(--error);
}
.success h, .warning h, .error h {
	text-transform: uppercase;
	color: var(--background);
	font-size: 0.9rem;
}
.success p, .warning p, .error p {
	text-transform: lowercase;
	color: var(--background);
	font-size: 0.8rem;
}
</style>
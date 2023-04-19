<script lang="ts">
import { reactive } from 'vue';
import { notification } from './types/notification';

export default {
	setup() {
		const notification:notification = reactive({
			type: 'info',
			title: '',
			message: '',
		});

		return {
			notification,
		};
	},
};
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
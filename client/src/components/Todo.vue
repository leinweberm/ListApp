<script lang="ts">
import { defineComponent, defineProps } from 'vue';

export default defineComponent({
	name: 'Todo',
	setup() {
		const props = defineProps({
			icon: {
				type: String,
				required: false,
				default: 'fa-file',
			},
			title: {
				type: String,
				required: true,
			},
		});

		return {
			props,
		};
	},
});
</script>

<template>
	<div class="todoBody">
		<div class="todoIcon">
			<icon
				:icon="`fa-solid fa-2xl fa-file`"
				class="fa-solid"
				style="height: 25px;"
			/>
		</div>
		<div class="todoText">{{ 'TEST TODO TITLE' }}</div>
		<div class="todoActions">
			<icon
				:icon="`fa-solid fa-2xl fa-circle-info`"
				class="fa-reverse"
				style="height: 28px;"
			/>
			<icon
				:icon="`fa-solid fa-2xl fa-circle-xmark`"
				class="fa-reverse"
				style="height: 28px;"
			/>
		</div>
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
}
.todoBody {
	background-color: var(--background);
	height: 55px;
	width: 100%;
	display: grid;
	grid-template-columns: 60px calc(100% - 150px) 90px;
	grid-template-areas: "icon text actions";
	margin-bottom: 10px;
	border-radius: 8px;
	border: 1px solid var(--border);
}
.todoIcon {
	grid-area: icon;
	display: flex;
	height: 55px;
	width: 60px;
	align-items: center;
	justify-content: center;
}
.todoText {
	grid-area: text;
	display: flex;
	width: 100%;
	height: 55px;
	align-items: center;
	justify-content: flex-start;
	padding: 0 20px;
	overflow: hidden;
}
.todoActions {
	grid-area: actions;
	display: flex;
	height: 55px;
	width: 90px;
	align-items: center;
	justify-content: space-around;
	padding-right: 10px;
}
</style>
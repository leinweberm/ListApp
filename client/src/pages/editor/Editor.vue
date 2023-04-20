<script lang="ts">
	import { defineComponent, onMounted, onActivated, ref, useAttrs } from 'vue';
	import { todo } from '../../types/todo';
	import { useRoute, useRouter } from 'vue-router';
	import { usePreferenceStore } from '../../stores/preferences';
	import { User } from '../../types/user';
import { propsToAttrMap } from '@vue/shared';

	export default defineComponent({
		name: 'Editor',
		setup() {
			const route = useRoute();
			const router = useRouter();
			const todo = ref<todo|null>(null);
			const preferenceStore = usePreferenceStore();
			const authedUser = ref<User|null>(null);
			const todoUid = ref<string>('');
			const isNew = ref<boolean>(true);

			onMounted(() => {
				authedUser.value = preferenceStore.currentUser;
				const routeParams = JSON.parse(JSON.stringify(route.params));
				isNew.value = (routeParams.id === '+');
				const attrs = useAttrs();
				console.log('routeParams', routeParams);
				console.log('attrs', attrs);

				if (authedUser.value) {
					console.log('nacte se z databaze')
				} else {
					if (isNew.value) {
						todo.value = { name: '', description: '' };
					} else {
						// todo.value = {
						// 	todo_uid: routeParams.id.toString(),
						// 	title: routeParams.title || '',
						// 	description: ''
						// };
					}
				}
			});

			return {

			};
		},
	});
</script>

<template>
	<div class="editorBody">
		<div class="editorRow">
			<input
				type="text"
				
			/>
		</div>
	</div>
</template>

<style scoped>
.editorRow {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: auto;
	min-height: 50px;
	border: 1px solid red;
	background-color: var(--background);
	justify-content: center;
	align-items: flex-start;
	padding: 10px;
}
.editorColumn {
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid green;
	background-color: var(--background);
	justify-content: center;
	align-items: flex-start;
	padding: 10px;
}
</style>
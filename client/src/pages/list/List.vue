<script lang="ts">
import {
	defineComponent,
	onActivated,
	onMounted,
	ref,
	nextTick
} from 'vue';
import { useRouter } from 'vue-router';
import { usePreferenceStore } from '../../stores/preferences';

import { todos } from '../../types/todo';

export default defineComponent({
	setup() {
		const router = useRouter();
		const preferenceStore = usePreferenceStore();
		let todoList = ref<todos>([]);

		onMounted(() => {
			if (preferenceStore.currentUser) {
				console.log('bude nacteno z DB');
			} else {
				todoList.value = preferenceStore.currentTodos;
				if (!todoList || !todoList.value.length) {
					todoList.value.push({
						todo_uid: 'a1b1c1d1e1',
						name: 'example todo item',
						description: 'this is example todo item description, you may delete this todo or edit it',
						icon: 'fa-file',
					})
				}
				preferenceStore.setTodos(todoList.value);
			}
			nextTick();
		});

		onActivated(() => {
			todoList.value = preferenceStore.currentTodos;
			console.log('currentStore todos:', preferenceStore.currentTodos);
			nextTick();
		});

		const deleteTodo = (todoUid:string) => {
			console.log('todoUid', todoUid);
			todoList.value = todoList.value.filter((todo) => (
				todo.todo_uid !== todoUid
			));
			if (preferenceStore.currentUser) {
			}
			preferenceStore.setTodos(todoList.value);
			nextTick();
		};

		const createTodo = () => {
			router.push('/editor/+');
		};

		return {
			todoList,
			deleteTodo,
			createTodo,
		};
	},
});
</script>

<template>
	<div id="listPage" class="pageBody">
		<div class="pageInnerBody">
			<div class="todos">
				<todo-item
					v-for="todo in todoList"
					:key="todo.todo_uid"
					:todoUid="todo.todo_uid"
					:todoIcon="todo.icon"
					:todoTitle="todo.name"
					:todoDescription="todo.description"
					@delete-selected-todo="deleteTodo"
				/>
			</div>
			<button
				class="main"
				@click.stop="createTodo"
			>
				{{ $t('add') }}
			</button>
		</div>
	</div>
</template>

<style scoped>	
.todos {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-left: 10px;
}
.todo {
	display: flex;
	height: 30px;
	width: 100%;
	background-color: var(--background);
}
@media (min-width: 768px) {
	.todos:hover::-webkit-scrollbar-thumb {
		background-color: var(--disabled);
	}
}
</style>
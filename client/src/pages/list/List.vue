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
		const authedUser = ref(preferenceStore.currentUser);
		let todoList = ref<todos>([]);

		onMounted(() => {
			authedUser.value = preferenceStore.currentUser;

			if (authedUser.value) {
				console.log('bude nacteno z DB');
			} else {
				const localItems = localStorage.getItem('list-app-todos');
				if (localItems) {
					todoList.value = JSON.parse(localItems);
				}
				if (!todoList || !todoList.value.length) {
					todoList.value.push({
						todo_uid: 'a1b1c1d1e1',
						name: 'example todo item',
						description: 'this is example todo item description, you may delete this todo or edit it',
						icon: 'fa-file',
					})
				}
			}
			nextTick();
		});

		onActivated(() => {
			authedUser.value = preferenceStore.currentUser;
		});

		const deleteTodo = (todoUid:string) => {
			todoList.value = todoList.value.filter((todo) => (
				todo.todo_uid !== todoUid
			));

			if (authedUser.value) {
				console.log('bude ulozeno do DB');
			} else {
				saveTodoList(todoList.value);
			}
		};

		const createTodo = () => {
			router.push('/editor/+');
		};

		const saveTodoList = (todos:todos) => {
			localStorage.setItem('list-app-todos', JSON.stringify(todos));
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
				/>
			</div>
			<button class="addToDo" @click.stop="createTodo">
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
.todos:hover::-webkit-scrollbar-thumb {
	background-color: var(--disabled);
}
.todo {
	display: flex;
	height: 30px;
	width: 100%;
	background-color: var(--background);
}
.addToDo {
	height: 40px;
	display: flex;
	width: 100%;
	max-width: 250px;
	text-align: center;
	align-items: center;
	justify-content: center;
	margin: 30px 0 0 0;
}
</style>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { todos } from './types/todo';

export default defineComponent({
	setup() {
		const route = useRoute();
		let todoList = reactive<todos>([]);

		onMounted(() => {
			const localItems = localStorage.getItem('list-app-todos');
			if (localItems) {
				todoList = JSON.parse(localItems);
			} else {
				console.log('no todos saved in localStorage');
			}
			console.log('route params', route.params);
			console.log('todoList', todoList);
		});


		return {
			todoList,
		};
	},
});
</script>

<template>
	<div id="listPage" class="pageBody">
		<div class="pageInnerBody">
			<div class="todos">
				<todo-item
					:icon="'fa-file'"
					:title="'TEST ToDo title'"
				/>
			</div>
			<button class="addToDo">
				{{ $t('add') }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.todos {
	display: flex;
	width: 100%;
	height: 100%;
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
	margin: 10px 0 0 0;
}
</style>
<script lang="ts">
	import { defineComponent, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { v4 as uuid } from 'uuid';

	import { usePreferenceStore } from '../../stores/preferences';
	import { todo } from '../../types/todo';

	export default defineComponent({
		name: 'Editor',
		setup() {
			const route = useRoute();
			const todo = ref<todo>({
				name: '',
				description: '',
				icon: 'fa-file',
				created: new Date().toISOString(),
			});
			const preferenceStore = usePreferenceStore();
			const isNew = ref<boolean>(true);
			const dirty = ref<boolean>(false);
			const iconOptions = [
				'fa-file', 'fa-calendar', 'fa-car', 'fa-cart-shopping',
			]

			onMounted(() => {
				const routeParams = JSON.parse(JSON.stringify(route.params));
				isNew.value = (routeParams.todo_uid === '+');
				if (!preferenceStore.currentUser) {
					todo.value.todo_uid = 'dsfffsfsfsfs';
				}
				if (!isNew.value) {
					const findTodo = preferenceStore.getTodo(routeParams.todo_uid);
					if (findTodo) {
						todo.value = findTodo;
						console.log('todo.value', todo.value);
					}
				}
			});

			const validateTodo = () => {
				return (
					todo.value.name &&
					todo.value.name.trim().length &&
					todo.value.description &&
					todo.value.description.trim().length
				);
			};

			const saveTodo = () => {
				const validation = validateTodo();
				if (validation) {
					if (preferenceStore.currentUser) {
						console.log('bude nahrano do DB');
					}
					if (isNew.value) {
						preferenceStore.insertTodo(todo.value);
					} else {
						preferenceStore.updateTodo(todo.value);
					}
					const logTodos = preferenceStore.currentTodos;
					console.log('logTodos', logTodos);
				}
			};

			return {
				todo,
				dirty,
				iconOptions,
				saveTodo,
				validateTodo,
			};
		},
	});
</script>

<template>
	<div class="pageBody">
		<div class="pageInnerBody">
			<div class="editor">
				<div class="editorColumn">
					<span class="size-1">
						<label>{{ $t('icon') + ':' }}</label>
							<div class="editorRow" style="padding: 0;">
								<div
									v-for="icon in iconOptions"
									:key="icon"
									class="size-4 iconSelection"
									:class="(todo.icon === icon) && 'iconSelected'"
									@click.stop="todo.icon = icon; dirty = true"
								>
									<icon
										:icon="`fa-solid ${icon}`"
										:class="(todo.icon === icon) ? 'fa-solid' : 'fa-reverse'"
										style="height: 28px;"
									/>
								</div>
							</div>
					</span>
				</div>
				<div class="editorColumn" style="margin-top: 10px;">
					<span class="size-1">
						<label for="todoTitle">{{ $t('title') + ':' }}</label>
						<input
							id="todoTitle"
							type="text"
							v-model="todo.name"
							@input="dirty = true"
							@change="dirty = true"
						/>
					</span>
				</div>
				<div class="editorRow" style="margin-top: 10px;">
					<button>
						{{ $t('done') }}
					</button>
					<button
						class="inverse"
						style="background-color: var(--secondary-background);"
					>
						{{ $t('delete') }}
					</button>
				</div>
				<div class="editorColumn" style="margin-top: 10px;">
					<span class="size-1">
						<label for="todoDescription">{{ $t('description') + ':' }}</label>
						<textarea
							id="todoDescription"
							type="textarea"
							v-model="todo.description"
							@input="dirty = true"
							@change="dirty = true"
						></textarea>
					</span>
				</div>
			</div>
			<div class="editorRow">
				<button
					:disabled="!dirty"
					class="main"
					@click.stop="saveTodo"
				>
					{{ $t('save') }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.editor {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-left: 10px;
}
.editorRow {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	min-height: 50px;
	justify-content: center;
	align-items: flex-start;
}
.editorColumn {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
}
#todoTitle {
	height: 35px;
	font-weight: 600;
	font-size: 1rem;
}
#todoDescription {
	height: 200px;
}
.iconSelection {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	border-radius: 4px;
	cursor: pointer;
}
.iconSelected, .iconSelection:hover {
	background-color: var(--background);
}
@media (min-width: 768px) {
	.editor:hover::-webkit-scrollbar-thumb {
		background-color: var(--disabled);
	}
}
</style>
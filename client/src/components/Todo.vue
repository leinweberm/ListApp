<script lang="ts">
import { defineComponent, ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { todo } from '../types/todo';

export default defineComponent({
	name: 'Todo',
	props: {
		todoUid: {
			type: String,
		},
		todoIcon: {
				type: String,
				default: 'fa-file',
			},
		todoTitle: {
			type: String,
			required: true,
			default: 'No Title',
		},
		todoDescription: {
			type: String,
			default: 'empty description',
		}
	},
	setup(props, context) {
		const description = ref<string>(props.todoDescription);
		const router = useRouter();

		onMounted(() => {
			prepareDescription();
		});

		onActivated(() => {
			prepareDescription();
		});

		const prepareDescription = () => {
			let str:string = description.value;
			str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
			description.value = str.trim();
		};

		const openSelected = () => {
			router.push(`/editor/${props.todoUid}`);
		};

		const deleteSelected = () => {
			context.emit('delete-selected-todo', props.todoUid);
		};

		return {
			props,
			description,
			openSelected,
			deleteSelected,
		};
	},
});
</script>

<template>
	<div class="todoBody">
		<div class="todoIcon" @click.stop="openSelected">
			<icon
				:icon="`fa-solid fa-2xl ${props.todoIcon}`"
				class="fa-solid"
				style="height: 25px;"
			/>
		</div>
		<div class="todoText" @click.stop="openSelected">
			<b>{{ props.todoTitle }}</b>
			<p>{{ description }}</p>
		</div>
		<div class="todoActions">
			<icon
				:icon="`fa-solid fa-2xl fa-circle-info`"
				class="fa-reverse"
				style="height: 28px;"
				@click.stop="openSelected"
			/>
			<icon
				:icon="`fa-solid fa-2xl fa-circle-xmark`"
				class="fa-reverse"
				style="height: 28px;"
				@click.stop="deleteSelected"
			/>
		</div>
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
}
h1, h2, h3, h4, b, p, i, u {
	margin-right: 20px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
h1, h2, h3, h4, b {
	color: var(--headings-color);
	font-size: 0.9rem;
	text-transform: uppercase;
}
p, i, u {
	color: var(--text-color);
	font-size: 0.8rem;
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
	cursor: pointer;
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
	flex-direction: column;
	width: 100%;
	height: 55px;
	justify-content: center;
	padding: 0 10px 0 0;
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
@media (max-width: 500px) {
	h1, h2, h3, h4, b, p, i, u {
		margin-right: 10px;
	}
	.todoBody {
		grid-template-columns: 60px calc(100% - 60px);
		grid-template-areas: "icon text";
	}
	.todoActions {
		display: none;
	}	
}
</style>
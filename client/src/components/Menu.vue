<script lang="ts">
import { ref } from 'vue';

export default {
	name: 'Menu',
	setup() {
		const userLogedIn = ref(false);
		return {
			userLogedIn
		};
	},
};
</script>

<template>
	<div class="menuBody">
		<div class="menuInnerBody">
			<RouterLink to="/" class="menuItem">
				<icon
					icon="fa-solid fa-list"
					class="fa-reverse"
					style="height: 20px;"
				/>
			</RouterLink>
			<RouterLink to="/editor/+" class="menuItem">
				<icon
					icon="fa-solid fa-circle-plus"
					class="fa-reverse"
					style="height: 40px;"
				/>
			</RouterLink>
			<RouterLink to="/user/+" class="menuItem">
				<icon
					icon="fa-solid fa-circle-user"
					class="fa-reverse"
					style="height: 40px;"
				/>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
.menuBody {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 60px;
	position: fixed;
	top: 0;
	background-color: var(--background);
}
.menuInnerBody {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 100%;
	max-width: 800px;
}
.menuItem {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: var(--secondary-background);
	cursor: pointer;
}
</style>
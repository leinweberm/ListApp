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
			<RouterLink to="/" class="menuItem"></RouterLink>
			<RouterLink to="/editor/+" class="menuItem"></RouterLink>
			<RouterLink to="/user/+" class="menuItem"></RouterLink>
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
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: var(--secondary-background);
	cursor: pointer;
}
</style>
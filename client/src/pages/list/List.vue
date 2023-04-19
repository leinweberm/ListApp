<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	setup(props) {
		const route = useRoute();
		onMounted(() => {
			console.log('route params', route.params);
		});

		return {

		};
	},
});
</script>

<template>
	<div id="listPage" class="pageBody">

	</div>
</template>

<style scoped>

</style>
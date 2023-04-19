<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { InputOption } from  '../types/inputOption';

export default defineComponent({
	name: 'InputSwitch',
	props: {
		attribute: {
			type: Object as PropType<InputOption>,
			required: true,
		},
		selected: {
			type: String || Number || Boolean
		},
		name: {
			type: String,
		},
	},
	
	setup(props, context) {
		const attr = props.attribute;
		const checked = ref<Boolean>(false);
		const selectedIndex = ref<Number>(0);

		onMounted(() => {
			if (props.selected) {
				attr.map((item, index) => {
					if (props.selected === item.value) {
						selectedIndex.value = index;
						return;
					}
				});
				checked.value = !!selectedIndex.value;
			} else {
				checked.value = false;
			}
		});

		const handleSwitch = () => {
			const selected= checked.value ? 1 : 0;
			selectedIndex.value = selected;
			console.log('selected:', attr[selected].value);
			context.emit('inputSwitchChanged', attr[selected].value);
		};

		return {
			attr,
			checked,
			handleSwitch,
		};
	},
});
</script>

<template>
	<label class="switch">
		<span
			style="right: 70px;"
			class="switchLabel"
			:class="{ activeSwitch: !checked}"
		>
			{{ attr[0].label }}
		</span>
		<input
			type="checkbox"
			v-model="checked"
			@change="handleSwitch"
		>
		<span class="slider round"></span>
		<span
			style="left: 70px;"
			class="switchLabel"
			:class="{ activeSwitch: checked}"
		>
			{{ attr[1].label }}
		</span>
	</label>
</template>

<style scoped>
.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
	margin: 10px;
}
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--secondary);
	-webkit-transition: .4s;
	transition: .4s;
}
.slider:before {
	position: absolute;
	content: "";
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: var(--background);
	-webkit-transition: .4s;
	transition: .4s;
}
input:checked + .slider {
	background-color: var(--primary);
}
input:focus + .slider {
	box-shadow: 0 0 1px var(--active);
}
input:checked + .slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}
.slider.round {
	border-radius: 34px;
}
.slider.round:before {
	border-radius: 50%;
}
.activeSwitch {
	color: var(--primary);
}
.switchLabel {
	position: absolute;
	top: 6px;
}
</style>
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';
import mitt from 'mitt';

import App from './App.vue';
import './assets/styles/global.css';
import MenuVue from './components/Menu.vue';
import InputSwitch from './components/InputSwitch.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Todos',
		component: () => import('./pages/list/List.vue'),
	},
	{
		path: '/editor/:id',
		name: 'Editor',
		component: () => import('./pages/editor/Editor.vue'),
	},
	{
		path: '/user/:id',
		name: 'User',
		component: () => import('./pages/user/User.vue'),
		children: [
			{
				path: 'login',
				component: () => import('./pages/user/Login.vue')
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const pinia = createPinia();

const app = createApp(App);
app.config.globalProperties.emitter = mitt();
app.use(router);
app.use(pinia);

app.component('ml-menu', MenuVue);
app.component('input-switch', InputSwitch);

app.mount('#app')

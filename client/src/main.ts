import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
	faCircleUser,
	faCircleXmark,
	faCircleInfo,
	faCirclePlus,
	faCalendar,
	faList,
	faFile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import mitt from 'mitt';

import App from './App.vue';
import './assets/styles/global.css';
import MenuVue from './components/Menu.vue';
import TodoItem from './components/Todo.vue';
import InputSwitch from './components/InputSwitch.vue'
import czCS from './locales/cs.json';
import enUS from './locales/en.json';

library.add(
	faCircleUser,
	faCircleXmark,
	faCircleInfo,
	faCirclePlus,
	faCalendar,
	faList,
	faFile,
);

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

type MessageSchema = typeof enUS;
const i18n = createI18n<[MessageSchema], 'en' | 'cs'>({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		'en': enUS,
		'cs': czCS,
	}
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(i18n);

app.config.globalProperties.emitter = mitt();

app.component('ml-menu', MenuVue);
app.component('input-switch', InputSwitch);
app.component('icon', FontAwesomeIcon);
app.component('todo-item', TodoItem);

app.mount('#app')

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: '李云飞'
	}
});

export default app;
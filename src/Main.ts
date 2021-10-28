import App from './App.svelte';
import './Global.scss';

let components = document.querySelectorAll('[data-component]');

components.forEach( ( item ) => {
	const form = item.dataset.form;
	const app = new App({
		target: item,
		props: {
			jsonFile: form
		}
	});
});
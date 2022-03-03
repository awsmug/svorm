import App from './App.svelte';
import './Global.scss';

/**
 * Svorm class for export
 * 
 * @since 1.0.0
 */
export default class Svorm {
    /**
     * Constructor
     * 
     * @since 1.0.0
     */
	constructor( formElements = [] ) {
		let components = document.querySelectorAll('[data-component]');

		components.forEach( ( item ) => {
			const form = item.dataset.form;
			new App({
				target: item,
				props: {
					jsonFile: form
				}
			});
		});
	}
}
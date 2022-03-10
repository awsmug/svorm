import { onMount } from 'svelte';
import SvormApp from './Svorm.svelte';

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
	constructor( customElements = [] ) {
		onMount(() => {
			let components = document.querySelectorAll('[data-component]');

			components.forEach( ( component ) => {
				const jsonFile = component.dataset.form;
								
				fetch( jsonFile, { method: 'GET'} )
				.then( response => response.json() )
				.then( data => {
					new SvormApp({
						target: component,
						props: {
							data,
							customElements
						}
					});
				})
				.catch( ( error ) => {
					console.error( 'Error:', error );
				});
			});
		});		
	}
}
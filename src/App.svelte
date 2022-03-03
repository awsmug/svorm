<script lang="ts">    
    import Form from './Components/Form.svelte';
    export let jsonFile;
	export let formElements;

    async function loadForm() {
		const response = await fetch( jsonFile );
		const content = await response.json();

		if ( response.ok ) {
			return content;
		} else {
			throw new Error(content);
		}
	}
</script>

{#await loadForm()}
	<p>...waiting</p>
{:then FormData}
    <Form formData={FormData} formElements={formElements} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

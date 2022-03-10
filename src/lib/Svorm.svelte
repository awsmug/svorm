<script lang="ts">    
    import Form from './Components/Form.svelte';	
	
    export let data;
	export let customElements = [];	
</script>

<Form {data} {customElements} />
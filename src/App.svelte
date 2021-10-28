<script lang="ts">    
    import Form from './Components/Form.svelte';
    import FormData from './contact.json';
</script>

<Form formData={FormData} />

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

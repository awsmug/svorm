<script lang="ts">  
    import type HasFormData from '../Interfaces/HasFormData';

    import Form from '../Classes/Form';
    import Fieldset from './Fieldset.svelte';
    import Navigation from './Navigation.svelte';

    export let formData: HasFormData;
    
    let form = new Form( formData );

    let update = ( e ) => {
        form = e.detail;
    }

    $: showNavbar = form.navigation.getCurrentFieldset().name !== 'start';
</script>

<form name={form.name} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 {form.getClasses()}" on:submit|preventDefault>
    <div class="fieldsets">
        {#each form.fieldsets as fieldset}
            {#if fieldset.name === form.navigation.getCurrentFieldset().name }
                <Fieldset fieldset={fieldset} on:update={update} />
            {/if}
        {:else}
            JSON data failure.
        {/each}
    </div>
    {#if showNavbar}
        <Navigation navigation={form.navigation} on:navigate={update} />
    {/if}
</form>
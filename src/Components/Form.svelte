<script lang="ts">  
    import Form from '../Classes/Form';
    import Fieldset from './Fieldset.svelte';
    import Navigation from './Navigation.svelte';

    export let formData;
    export let formElements;
    
    let form = new Form( formData );
    let showNavbar = true;

    let update = ( e ) => {
        form = e.detail;
    }
</script>

<form name={form.name} class={form.getClasses()} on:submit|preventDefault>
    <div class="fieldsets">
        {#each form.fieldsets as fieldset}
            {#if fieldset.name === form.navigation.getCurrentFieldset().name }
                <Fieldset fieldset={fieldset} formElements={formElements} on:update={update} />
            {/if}
        {:else}
            JSON data failure.
        {/each}
    </div>
    {#if showNavbar}
        <Navigation navigation={form.navigation} on:navigate={update} />
    {/if}
</form>
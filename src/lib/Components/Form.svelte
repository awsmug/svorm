<script lang="ts">
    import Form from '../Classes/Form';

    import Fieldset from './Fieldset.svelte';
    import Navigation from './Navigation.svelte';    

    export let data;
    export let customElements = [];
    
    let form = new Form( data );
    let showNavbar = true;

    let update = ( e ) => {
        form = e.detail;
        console.log(form);
    }
</script>

<form name={form.name} class={form.getClasses()} on:submit|preventDefault novalidate>
    <div class="fieldsets">
        {#each form.fieldsets as fieldset}
            {#if fieldset.name === form.navigation.getCurrentFieldset().name }
                <Fieldset {fieldset} {customElements} on:update={update} />
            {/if}
        {:else}
            JSON data failure.
        {/each}
    </div>
    {#if showNavbar}
        <Navigation navigation={form.navigation} on:navigate={update} />
    {/if}
</form>
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import type Fieldset from '../Classes/Fieldset';
    
    import Percentage from './Percentage.svelte';
    import Registration from '$lib/Classes/Registration';
    
    export let fieldset: Fieldset;
    export let customElements;

    $: fields = fieldset.fields;

    const dispatch = createEventDispatcher();

    function update( form ) {
        dispatch( 'update', form.detail );
    }

    let percentageStart: number;

    switch( fieldset.form.navigation.getLastAction() ) {
        case 'prev':
            percentageStart = fieldset.form.navigation.getNextFieldset().percentage;
            break;
        case 'next':
            percentageStart = fieldset.form.navigation.getPrevFieldset().percentage;
            break;
        default:
            percentageStart = 0;
            break;
    }

    let percentageCurrent = fieldset.form.navigation.getCurrentFieldset().percentage;

    let registration = new Registration();	

    customElements.forEach( element => {
        registration.addElement( element.name, element.element );
    });
</script>

<fieldset class={fieldset.getClasses()} in:fade>
    <legend>{fieldset.label}</legend>
    {#if fieldset.percentage !== undefined}
        <Percentage start={percentageStart} percentage={percentageCurrent} />
    {/if}
    <div class="fields {fieldset.getFieldsClasses()}">
        {#each fields as field}
            {#if field.conditionsFullfilled() }
                <div class={field.getClasses()} in:fade>  
                    {#if field.type === 'h1'}
                        <h1>{field.getValue()}</h1>
                    {:else if field.type === 'h2'}
                        <h2>{field.getValue()}</h2>
                    {:else if field.type === 'h3'}
                        <h3>{field.getValue()}</h3>
                    {:else if field.type === 'h4'}
                        <h4>{field.getValue()}</h4>
                    {:else if field.type === 'h5'}
                        <h5>{field.getValue()}</h5>
                    {:else if field.type === 'h6'}
                        <h6>{field.getValue()}</h6>
                    {:else if field.type === 'p'}
                        <p>{field.getValue()}</p>
                    {:else}
                        <svelte:component this={registration.getElement(field.type)} field={field} on:update={update} />
                    {/if}
                </div>
            {/if}            
        {/each}
    </div>
</fieldset>
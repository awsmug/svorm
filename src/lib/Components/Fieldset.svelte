<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import type Fieldset from '../Classes/Fieldset';
    
    import Percentage from './Percentage.svelte';
    import Registration from '$lib/Classes/Registration';
    import Group from './Elements/Group.svelte';
    
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
            {#if field.type === 'group'}
                <Group>
                    {#each field.fields as groupedfield}
                        {#if groupedfield.conditionsFullfilled() }
                        <div class="mb-3 {groupedfield.getClasses()}" in:fade>
                            <svelte:component this={registration.getElement(groupedfield.type)} field={groupedfield} on:update={update} />
                        </div>
                        {/if}
                    {/each}
                </Group>                
            {:else}
                {#if field.conditionsFullfilled() }
                    <div class="{field.getClasses()} mb-3" in:fade>
                        <svelte:component this={registration.getElement(field.type)} field={field} on:update={update} />
                    </div>
                {/if}
            {/if}           
        {/each}
    </div>
</fieldset>
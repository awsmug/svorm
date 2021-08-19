<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import type Fieldset from '../Classes/Fieldset';

    import Text from './Inputs/Text.svelte';
    import Textarea from './Inputs/Textarea.svelte';
    import Range from './Inputs/Range.svelte';
    import Checkbox from './Inputs/Checkbox.svelte'; 
    import ChoiceSelect from './Inputs/ChoiceSelect.svelte';
    import ChoiceRadio from './Inputs/ChoiceRadio.svelte';
    import ChoiceImage from './Inputs/ChoiceImage.svelte'; 
    import Percentage from './Percentage.svelte';
    
    export let fieldset: Fieldset;

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
                    {#if field.type === 'text'}
                        <Text field={field} on:update={update} />
                    {:else if field.type === 'textarea'}
                        <Textarea field={field} on:update={update}  />
                    {:else if field.type === 'range'}
                        <Range field={field} on:update={update}  />
                    {:else if field.type === 'checkbox'}
                        <Checkbox field={field} on:update={update} />
                    {:else if field.type === 'choice-select'}
                        <ChoiceSelect field={field} on:update={update} />
                    {:else if field.type === 'choice-radio'}
                        <ChoiceRadio field={field} on:update={update} />
                    {:else if field.type === 'choice-image'}
                        <ChoiceImage field={field} on:update={update} />
                    {:else if field.type === 'headline'}
                        <h2>{field.getValue()}</h2>
                    {:else if field.type === 'paragraph'}
                        <p>{field.getValue()}</p>
                    {/if}
                </div>
            {/if}            
        {/each}
    </div>
</fieldset>
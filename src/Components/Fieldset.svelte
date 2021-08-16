<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import type Fieldset from '../Classes/Fieldset';

    import Text from './Inputs/Text.svelte';
    import Textarea from './Inputs/Textarea.svelte';
    import Range from './Inputs/Range.svelte';
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

<fieldset class={fieldset.getClasses()}>
    <legend>{fieldset.label}</legend>
    {#if fieldset.percentage !== undefined}
        <Percentage start={percentageStart} percentage={percentageCurrent} />
    {/if}
    <div class="fields {fieldset.getFieldsClasses()}" out:fade={{duration:500}} in:fade={{duration:500,delay:500}}>
        {#each fields as field}
            {#if field.type === 'Text'}
                <Text field={field} on:update={update} />
            {:else if field.type === 'TextArea'}
                <Textarea field={field} on:update={update}  />
            {:else if field.type === 'Range'}
                <Range field={field} on:update={update}  />
            {:else if field.type === 'ChoiceSelect'}
                <ChoiceSelect field={field} on:update={update} />
            {:else if field.type === 'ChoiceRadio'}
                <ChoiceRadio field={field} on:update={update} />
            {:else if field.type === 'ChoiceImage'}
                <ChoiceImage field={field} on:update={update} />
            {:else if field.type === 'Headline'}
                <h2>{field.value}</h2>
            {:else if field.type === 'Paragraph'}
                <p>{field.value}</p>
            {/if}            
        {/each}
    </div>
</fieldset>
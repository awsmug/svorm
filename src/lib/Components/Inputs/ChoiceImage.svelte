<script lang="ts">    
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );

        if ( field.params.setNextFieldset ) {
            field.fieldset.form.navigation.nextFieldset();
        }
    }
</script>

{#if field.label !== undefined}
    <legend>{field.label}  <Help {field} /></legend>
{/if}


{#each field.choices as choice}
    <label class="{choice.value === field.value ? 'selected': ''}">
        <img src={choice.image} alt={choice.label} />
        <input type=radio bind:group={field.value} value={choice.value} on:change={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />
        <div class="image-text">{choice.label}</div>
    </label>
{/each}
<Errors field="{field}" />

<style>
    label {        
        cursor: pointer;
    }
    input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
</style>
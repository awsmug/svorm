<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from "../../Classes/Field";
    import Help from '../Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    let dispatch = createEventDispatcher();
    
    $: errors = field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
        
        if ( field.params.setNextFieldset ) {
            field.fieldset.form.navigation.nextFieldset();
        }
    }
</script>

{#if field.label !== undefined}
    <legend>{field.label}</legend>
{/if}

<div class="{field.getClasses(['input', 'input-choice-radio'])}">
    {#each field.choices as choice}
        <label>
            <input type=radio bind:group={field.value} value={choice.value} on:change={setValue} />
            {choice.label}
        </label>
    {/each}
</div>

<Help field={field} />

<style>
    label {        
        cursor: pointer;
    }
 </style>
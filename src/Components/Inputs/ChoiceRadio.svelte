<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from "../../Classes/Field";
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();
    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
        
        if ( field.params.setNextFieldset ) {
            field.fieldset.form.navigation.nextFieldset();
        }
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

{#if field.label !== undefined}
    <legend>
        {field.label}
        <HelpIcon field={field} on:toggleHelp={toggleHelp} />
    </legend>
{/if}

{#each field.choices as choice}
    <label>
        <input type=radio bind:group={field.value} value={choice.value} on:change={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />
        {choice.label}
    </label>
{/each}
<Errors field="{field}" />
<Help field={field} show={showHelp} />

<style>
    label {        
        cursor: pointer;
    }
 </style>
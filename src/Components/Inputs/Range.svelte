<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from "../../Classes/Field";
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from "../Errors.svelte";
    
    export let field: Field;

    const dispatch = createEventDispatcher();
    let   classes  : string[] = ['input', 'input-range'];

    $: field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<div class={field.getClasses(classes)}>
    <label for={field.name}>
        {field.label}:  {field.value} {#if field.params.unit !== undefined}{field.params.unit}{/if}
        <HelpIcon field={field} on:toggleHelp={toggleHelp} />
    </label>
    <input name={field.name} type=range bind:value={field.value} min={field.params.min} max={field.params.max} step={field.params.step} on:blur={setValue}  />
    <Errors field={field} />
</div>

<Help field={field} show={showHelp} />
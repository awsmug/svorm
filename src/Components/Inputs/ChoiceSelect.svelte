<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();
    let   classes  : string[] = ['input', 'input-choice-select'];

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
        {field.label}
        <HelpIcon field={field} on:toggleHelp={toggleHelp} />
    </label>
    <select name={field.name} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''}>
        {#each field.choices as choice}
            <option value={choice.value}>{choice.label}</option>
        {/each}
    </select>
    <Errors field={field} />
</div>

<Help field={field} show={showHelp} />
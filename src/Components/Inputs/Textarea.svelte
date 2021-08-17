<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();
    let   classes  : string[] = ['input', 'input-textarea'];

    $: field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<div class={field.getClasses( classes )}>
    <label for={field.name}>
        {field.label}
        <HelpIcon field={field} on:toggleHelp={toggleHelp} />
    </label>
    <div><textarea name="{field.name}" placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''}></textarea></div>
    <Errors field="{field}" />
</div>

<Help field={field} show={showHelp} />
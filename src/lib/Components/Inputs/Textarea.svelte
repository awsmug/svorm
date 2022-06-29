<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';

    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<label for={field.name}>{field.label}</label>

<div class="input-group input-textarea mb-3">
    <textarea class="form-control" name="{field.name}" placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''}></textarea>
</div>
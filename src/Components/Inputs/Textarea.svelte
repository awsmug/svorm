<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();

    $: errors = field.getValidationErors();

    let showHelp = false;

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<div class="{field.getClasses(['input', 'input-textarea'])}">
    <label for="{field.name}">{field.label} </label>
    <textarea name="{field.name}" placeholder={field.placeholder} bind:value={field.value} on:blur={setValue}></textarea>   
</div>

<Help field={field} />
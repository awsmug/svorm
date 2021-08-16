<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();
    let classes : string[] = ['input', 'input-text'];

    $: field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<div class="{field.getClasses( classes )}">
    <label for="{field.name}">{field.label}</label>
    <div><input type=text name="{field.name}" placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} /></div>
    <Errors field="{field}" />
</div>

<Help field={field} />
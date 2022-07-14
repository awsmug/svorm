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
    }

    field.addInputClass('form-control');
</script>

<label for={field.name}>{field.label} <Help {field} /></label>

<div class="input-group">
    <textarea class="form-control" id={field.name} name={field.name} placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''}></textarea>
    <Errors field="{field}" />  
</div>
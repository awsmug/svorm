<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';

    import Errors from '../Errors.svelte';

    export let field: Field;

    $: field.autoValue();
    
    if( field.value == undefined ) {
        field.value = false;
    }

    const dispatch = createEventDispatcher();
    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<div class="input-checkbox-field">
    <label for={field.name}>{field.label}</label>
    <input type=checkbox id={field.name} name={field.name} placeholder={field.placeholder} bind:checked={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />   
    <Errors field="{field}" />
</div>
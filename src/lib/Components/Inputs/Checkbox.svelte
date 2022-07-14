<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';

    import Errors from '../Errors.svelte';
import Help from '../Help.svelte';

    export let field: Field;

    $: field.autoValue();
    
    if( field.value == undefined ) {
        field.value = false;
    }

    const dispatch = createEventDispatcher();
    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<label for={field.name}>{field.label} <Help {field} /></label>

<div class="input-checkbox-field">
    <input type=checkbox id={field.name} name={field.name} placeholder={field.placeholder} bind:checked={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />   
    <Errors field="{field}" />
</div>
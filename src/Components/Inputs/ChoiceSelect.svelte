<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from '../Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();

    $: errors = field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<div class="{field.getClasses(['input', 'input-choice-select'])}">
    <label for="{field.name}">{field.label}</label>       
    <select name="{field.name}" bind:value={field.value} on:blur={setValue}>
        {#each field.choices as choice}
            <option value={choice.value}>{choice.label}</option>
        {/each}
    </select>
</div>

<Help field={field} />
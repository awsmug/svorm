<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type Field from '../../Classes/Field';
    import Errors from '../Errors.svelte';

    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {
        dispatch( 'update', field.fieldset.form );
    }

    field.addInputClass('form-control');
</script>

<label for={field.name}>{field.label}</label>

<div class="input-group">
    <input type=text id={field.name} class={field.getInputClasses()} placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />
    <span class="input-group-text" id="{field.name}-help">?</span>
    <Errors field="{field}" />
</div>


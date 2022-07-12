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

    field.addInputClass('form-select');
</script>

<label for={field.name}>{field.label}</label>

<div class="input-group">
    <select id={field.name} class={field.getInputClasses()} name={field.name} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''}>
        {#each field.choices as choice}
            <option value={choice.value}>{choice.label}</option>
        {/each}
    </select>
    {#if field.help !== undefined}
        <span class="input-group-text" id="{field.name}-help" data-bs-toggle="tooltip" data-bs-html="true" title={field.help.content}>?</span>
    {/if}
</div>

<Errors field="{field}" />
<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type Field from "../../Classes/Field";
    import Errors from "../Errors.svelte";
    
    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {
        dispatch( 'update', field.fieldset.form );
    }
    
    field.addInputClass('form-range');
</script>

<div class="input-group">
    <label for={field.name}>{field.label}</label>
    <input type=range  id={field.name}  class={field.getInputClasses()} bind:value={field.value} min={field.params.min} max={field.params.max} step={field.params.step} on:blur={setValue}  />
    <Errors {field} />
</div>
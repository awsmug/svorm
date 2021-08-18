<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from "../../Classes/Field";
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from "../Errors.svelte";
    
    export let field: Field;

    const dispatch = createEventDispatcher();
    const setValue = () => {
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<label for={field.name}>
    {field.label}:  {field.value} {#if field.params.unit !== undefined}{field.params.unit}{/if}
    <HelpIcon field={field} on:toggleHelp={toggleHelp} />
</label>
<div class="input-range-field">
    <input name={field.name} type=range bind:value={field.value} min={field.params.min} max={field.params.max} step={field.params.step} on:blur={setValue}  />
</div>
<Errors field={field} />
<Help field={field} show={showHelp} />
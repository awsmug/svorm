<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from "../../Classes/Field";
    
    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from "../Errors.svelte";
    
    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }
</script>

<label for={field.name}>{field.label}</label>

<div class="input group input-range-field">
    <input class="form-range" name={field.name} type=range bind:value={field.value} min={field.params.min} max={field.params.max} step={field.params.step} on:blur={setValue}  />
    <div class="input-group-append">
        <span class="input-group-text" id="{field.name}-help">?</span>
    </div>
</div>

<Errors field={field} />
<Help field={field} show={showHelp} />
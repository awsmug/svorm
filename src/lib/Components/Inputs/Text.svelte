<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';

    import Help from '../Help.svelte';
    import HelpIcon from '../HelpIcon.svelte';
    import Errors from '../Errors.svelte';

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

<label for={field.name}>
    {field.label} 
    <HelpIcon field={field} on:toggleHelp={toggleHelp} />
</label>

<div class="input-group">
    <input class="form-control" type=text name={field.name} placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} aria-describedby={field.help !== undefined ? field.name + '-help': ''} />
    <div class="input-group-append">
        <span class="input-group-text" id="{field.name}-help">?</span>
    </div>
</div>

<Errors field={field} />
<Help field={field} show={showHelp} />
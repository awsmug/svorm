<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Help from './Help.svelte';
    import Errors from '../Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();
    let classes : string[] = ['input', 'input-text'];

    $: errors = field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<div class="{field.getClasses( classes )}">
    <label for="{field.name}">{field.label}</label>
    <div><input type=text name="{field.name}" placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} /></div>    
    {#if field.hasValidationErrors() }
        <div class="errortext">
            <ul>
            {#each field.getValidationErors() as errortext}
                <li>{errortext}</li>    
            {/each}
            </ul>
        </div>
    {/if}
</div>

<Help field={field} />
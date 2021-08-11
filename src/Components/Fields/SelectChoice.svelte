<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../Classes/Field';
    import Errors from './Errors.svelte';

    export let field: Field;

    const dispatch = createEventDispatcher();

    $: errors = field.getValidationErors();

    const setValue = () => {      
        dispatch( 'update', field.fieldset.form );
    }
</script>

<div class="select-choice mt-5 mb-5">
    <div class="relative">
        <label class="block text-gray-700 text-sm font-bold mb-2"></label>
            {field.label}            
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" bind:value={field.value} on:blur={setValue}>
                {#each field.choices as choice}
                    <option value={choice.value}>{choice.label}</option>
                {/each}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </label>    
    </div>
</div>

<Errors errors={errors} />
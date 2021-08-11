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

<section class="text mt-5 mb-5 {field.getClasses()}">
    <label class="block text-gray-700 text-sm font-bold mb-2">
        {field.label}
        <input type=text placeholder={field.placeholder} bind:value={field.value} on:blur={setValue} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
    </label>    
</section>
<Errors errors={errors} />
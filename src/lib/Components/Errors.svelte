<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
</script>

{#if field.validations.hasErrors() }
<div class="invalid-feedback">
    <ul>
    {#each field.validations.getErrors() as errortext}
        <li>
            <div class="error-triangle"></div>
            <div class="error-content">{errortext}</div>
        </li>
    {/each}
    </ul>    
</div>
{/if}
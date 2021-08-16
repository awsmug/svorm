<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
</script>

{#if field.hasValidationErrors() }
<div class="errors">
    <ul>
    {#each field.getValidationErors() as errortext}
        <li>
            <div class="error-triangle"></div>
            <div class="error-content">{errortext}</div>
        </li>
    {/each}
    </ul>
</div>
{/if}
<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
</script>

{#if field.prefix !== undefined}
    <span class="input-group-text" id="{field.name}-prefix">{field.prefix}</span>
{/if}
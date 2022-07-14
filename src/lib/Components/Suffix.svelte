<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
</script>

{#if field.suffix !== undefined}
    <span class="input-group-text" id="{field.name}-suffix">{field.suffix}</span>
{/if}
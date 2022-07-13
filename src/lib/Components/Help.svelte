<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
    export let show: boolean;
</script>

{#if field.help !== undefined}
    <span class="input-group-text" id="{field.name}-help" data-bs-toggle="tooltip" data-bs-html="true" title={field.help.content}>?</span>
{/if}
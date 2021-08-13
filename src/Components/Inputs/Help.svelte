<script lang="ts">
    import type Field from '../../Classes/Field';
    export let field: Field;
</script>

{#if field.help !== undefined }
    <div class="input-help">{@html field.help.content}</div>
{/if}
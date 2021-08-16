<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;
</script>

{#if field.help !== undefined }
    <div class="input-help">
        <div class="input-help-triangle"></div>
        <div class="input-help-content">{@html field.help.content}</div>
    </div>
{/if}
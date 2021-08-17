<script lang="ts">
    import { fade } from 'svelte/transition';
    import type Field from '../Classes/Field';
    export let field: Field;
    export let show: boolean;
</script>

{#if field.help !== undefined && show }
    <div class="input-help" transition:fade>
        <div class="input-help-triangle"></div>
        <div id="{field.name}-help" class="input-help-content">{@html field.help.content}</div>
    </div>
{/if}
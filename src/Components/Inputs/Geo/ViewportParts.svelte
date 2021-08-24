<script lang="ts">
    import type Parts from '../../../Classes/Parts';
    import ViewportPart from './ViewportPart.svelte';

    export let parts: Parts;
</script>

<div class="viewport-content">
    {#each parts.items as part, i }
        <ViewportPart bind:part={part} key={i} />
    {/each}
</div>

<style>
    .viewport-content
    {
        display: flex;
        margin:auto;
    }
</style>
<script lang="ts">
    import type HasPartData from '../../../Interfaces/HasPartData';
    import ViewportPart from './ViewportPart.svelte';

    export let parts: HasPartData[];
</script>

<div class="viewport-content">
    {#each parts as part, i }
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
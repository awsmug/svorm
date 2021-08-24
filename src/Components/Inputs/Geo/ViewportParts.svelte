<script lang="ts">
    import type Parts from '../../../Classes/Parts';
    import ViewportPart from './ViewportPart.svelte';

    export let parts: Parts;
</script>


{#each parts.items as part, i }
    <ViewportPart bind:part={part} key={i} />
{/each}
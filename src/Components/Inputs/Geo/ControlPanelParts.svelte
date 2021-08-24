<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type Parts from '../../../Classes/Parts';
    import ControlPanelPart from './ControlPanelPart.svelte';

    export let parts: Parts;

    const dispatch = createEventDispatcher();

    const deletePart = ( e ) => {
        dispatch( 'deletePart', e.detail )
    }
</script>

<div class="parts">
    {#each parts.items as part, i }
        <ControlPanelPart bind:part={part} key={i} on:deletePart={deletePart} />
    {/each}
</div>
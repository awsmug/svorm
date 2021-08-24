<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type HasPartData from '../../../Interfaces/HasPartData';
    import ControlPanelPart from './ControlPanelPart.svelte';

    export let parts: HasPartData[];

    const dispatch = createEventDispatcher();
    let i: number  = 0;

    const updatePart = ( e ) => {
        dispatch( 'updatePart', e.detail )
    }

    const deletePart = ( e ) => {
        dispatch( 'deletePart', e.detail )
    }
</script>

<div class="parts">
    {#each parts as part, i }
        <ControlPanelPart bind:width={part.width} bind:length={part.length} bind:height={part.height} bind:horizontalOffset={part.horizontalOffset} bind:verticalOffset={part.verticalOffset} on:deletePart={deletePart} on:updatePart={updatePart} key={i}  />
    {/each}
</div>
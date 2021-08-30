<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Canvas from '../../../Classes/Canvas';

    import ControlPanelItemComponent from './ControlPanelItem.svelte';

    export let canvas: Canvas ;

    const newItem = () => {
        dispatch( 'newItem' );
    };

    const dispatch = createEventDispatcher();

    const deleteItem = ( e ) => {
        dispatch( 'deleteItem', e.detail );
    };

</script>

<div class="control-panel">
    <div class="control-panel-menu">
        <button on:click={newItem}>Gebäudeteil hinzufügen</button>
    </div>
    <div class="parts">
        {#each canvas.origItems as canvasItem, i }
            <ControlPanelItemComponent bind:canvasItem={canvasItem} key={i} on:deleteItem={deleteItem} />
        {/each}
    </div>
</div>

<style>
    .control-panel
    {
        background-color: darkgray;
        padding: 1rem;
    }
    .control-panel button
    {
        padding: 0.5rem;
    }
</style>
<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Canvas from '../../../Classes/Canvas';

    import ControlPanelItemComponent from './ControlPanelItem.svelte';

    export let canvas: Canvas ;

    const dispatch = createEventDispatcher();

    const newItem = () => {
        dispatch( 'newItem' );
    };

    const deleteItem = ( e ) => {
        dispatch( 'deleteItem', e.detail );
    };

</script>

<div class="control-panel">
    <div class="parts">
        {#each canvas.items as canvasItem, i }
            <ControlPanelItemComponent bind:canvasItem={canvasItem} key={i} on:deleteItem={deleteItem} />
        {/each}
    </div>
    <div class="control-panel-menu">
       <button class="button" on:click={newItem}>+</button>
    </div>
</div>

<style>
    .control-panel
    {
        border: lightgray solid 1px;
        
    }
    .control-panel .control-panel-menu 
    {
        padding: 1rem;
        background-color: lightgray;
    }
</style>
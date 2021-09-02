<script lang="ts">
    import type Canvas from '../../../Classes/Canvas';
    import CanvasItemComponent from './CanvasItem.svelte';

    export let canvas: Canvas;
    export let selectedItem:  number;
    let        wrapperWidth:  number;
    let        wrapperHeight: number;    

    const selectItem = ( e ) => {
        selectedItem = e.detail;
    }

    $:{
        if( wrapperWidth !== undefined && wrapperHeight !== undefined )
        {
            canvas.setWrapperSize( wrapperWidth, wrapperHeight );
        }
    }
</script>

<div class="canvas-border">
    <div class="canvas-wrapper" bind:clientHeight={wrapperHeight} bind:clientWidth={wrapperWidth}>
        <div class="canvas" style="height: {canvas.getHeight()}; width:{canvas.getWidth()}">
            {#each canvas.renderItems as canvasItem, i }
                <CanvasItemComponent bind:canvasItem={canvasItem} key={i} bind:selectedItem on:selectItem={selectItem} />
            {/each}
        </div>
    </div>
</div>

<style>
    .canvas-border
    {
        padding:1rem;
        background-color: lightgray;
    }
    .canvas-wrapper
    {
        height: 600;
        overflow: hidden;
    }
    .canvas-wrapper .canvas
    {
        margin:auto;
        background-color: lightgray;        
        overflow: hidden;
    }
</style>